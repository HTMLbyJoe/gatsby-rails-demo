class ApplicationController < ActionController::API
  include Clearance::Controller
  include ActionController::Cookies
  include ActionController::Flash
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception
  after_action :set_csrf_cookie

  def no_op
  end

  private

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = {
      value: form_authenticity_token,
      domain: ENV['COOKIE_DOMAIN'],
      same_site: :strict,
    }
  end
end
