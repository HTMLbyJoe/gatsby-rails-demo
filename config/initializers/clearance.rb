Clearance.configure do |config|
  config.allow_sign_up = false
  config.httponly = true
  config.mailer_sender = 'reply@example.com'
  config.redirect_url = '/'
  config.rotate_csrf_on_sign_in = true
  config.secure_cookie = Rails.env.production?
end
