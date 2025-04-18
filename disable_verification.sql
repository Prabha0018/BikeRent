-- Disable email verification requirements
UPDATE auth.config SET
  enable_confirmations = false,
  mailer_autoconfirm = true,
  enable_signup = true;

-- Set proper rate limits but keep them reasonable
UPDATE auth.config SET
  rate_limit_email_sent = 30,
  rate_limit_authenticated_requests = 1000; 