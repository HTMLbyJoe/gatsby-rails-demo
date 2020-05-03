class Mutations::Login < Mutations::BaseMutation
  argument :email, String, required: true
  argument :password, String, required: true

  field :success, Boolean, null: false
  field :errors, [String], null: false

  def resolve(email:, password:)
    user = User.authenticate(email, password)

    {
      success: user.present?,
      errors: []
    }
  end
end
