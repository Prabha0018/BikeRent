import { createContext, useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { supabaseService } from "../services/supabaseService";

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
                // Fetch user profile
                supabaseService.getProfile(session.user.id)
                    .then(profileData => {
                        setProfile(profileData);
                        setReady(true);
                    })
                    .catch(error => {
                        console.error("Error fetching profile:", error);
                        setReady(true);
                    });
            } else {
                setReady(true);
            }
        });

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUser(session.user);
                // Fetch user profile when auth state changes
                supabaseService.getProfile(session.user.id)
                    .then(profileData => {
                        setProfile(profileData);
                    })
                    .catch(error => {
                        console.error("Error fetching profile:", error);
                    });
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, profile, setProfile, ready}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;