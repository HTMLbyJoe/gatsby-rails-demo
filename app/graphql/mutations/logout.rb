class Mutations::Logout < Mutations::BaseMutation
  require 'clearance/session'

  field :success, Boolean, null: false

  def resolve
    context[:request].env[:clearance].sign_out

    {
      success: true
    }
  end
end
