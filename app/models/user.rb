# frozen_string_literal: true

# Represents a person who can log in to the app
class User < ApplicationRecord
  include Clearance::User
end
