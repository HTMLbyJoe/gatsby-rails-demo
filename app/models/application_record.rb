# frozen_string_literal: true

# The base model that all other models inherit from
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
