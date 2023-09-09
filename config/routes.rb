Rails.application.routes.draw do

  get "/races/:users_with_year", to: "races#users_with_year"
  
  resources :races
  resources :lengths, only: [:index, :create]
  resources :users, only: [:index, :show, :create, :update]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "users#show"
  get '/user_search/:search', to: "users#user_search"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
