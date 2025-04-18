-- Update SMTP configuration
UPDATE auth.config SET 
  smtp_host = 'smtp.resend.com',
  smtp_port = 587,
  smtp_user = 'resend',
  smtp_pass = current_setting('app.settings.smtp_pass'),
  smtp_max_frequency = 30, -- Allow more frequent emails
  smtp_admin_email = current_setting('app.settings.smtp_admin_email'),
  smtp_sender_name = 'Bike Rentals';

-- Enable email confirmations
UPDATE auth.config SET
  enable_signup = true,
  enable_confirmations = true,
  mailer_autoconfirm = false;

-- Set proper rate limits
UPDATE auth.config SET
  rate_limit_email_sent = 30; -- Increase email sending rate limit 