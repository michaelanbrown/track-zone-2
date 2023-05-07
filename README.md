# Track Zone!

## Models

I have incldued three models:
1. Users
2. Races
3. Lengths

### Users

The Users model has_many :races and has_many :lengths, through: :races.

### Races

The Races model belongs_to :user and belongs_to :length.

### Lengths

The Lengths model has_many :races and has_many :users, through: :races.

## Validations

### Users

The Users model validates:
1. :name, presence: true
2. :age, numericality: { greater_than_or_equal_to: 13 }
3. :username, presence: true, uniqueness: true
5. :email, presence: true, uniqueness: true

### Races

The Races model validates:
1. :name, presence: true
2. :year, presence: true, numericality: { greater_than: 1900 }, length: { is: 4 }
3. :duration, presence: true, format: {with: /\A(?!00:00:00)[0-5][0-9]:[0-5][0-9]:[0-5][0-9]\Z/}, on: :update
4. :user_id, presence: true
5. :length_id, presence: true

### Lengths

The Lengths model validates:
1. :distance, numericality: { greater_than: 0 }
2. :measurement, presence: true, inclusion: { in: %w(km mi m) }
3. validates_uniqueness_of :distance, scope: :measurement

## Schemas

### User

The Runner schema contains all pertinent information about each user including name, age, username, email, and password.

### Races

The Race schema contains all pertinent information about each race including the name, year, and a duration which defaults to TBD. They connect to their coach and event via the columns below:

```bash
t.integer "length_id"
```
```bash
t.index ["length_id"], name: "index_races_on_length_id"
```
```bash
t.integer "user_id"
```
```bash
t.index ["user_id"], name: "index_races_on_user_id"
```

### Lengths

The Event schema contains all pertinent information about each length including the distance and unit of measurement.

## Description

Track Zone allows users to connect and display their proud accomplishments through their race listings which include the length and achieved time of each race.

## Method Examples

```python
# Index
  def index 
      render json: User.all, status: :ok
  end
```

```python
# Show
  def show
      render json: current_user, status: :ok
  end
```

```python
# Create Request
  def create
      race = Race.create!(race_params)
      render json: race, status: :created
  end

  private

  def race_params
    params.permit(:name, :year, :length_id).merge(user_id: current_user.id)
  end
```

```python
# Update Request
  def update
    @race.update!(update_race_params)
    render json: @race, status: :accepted
  end

  def update_race_params
    params.permit(:name, :year, :duration)
  end
```

```python
# Delete Request
  def destroy
    @race.destroy
    head :no_content 
  end 
```

## Routes

```python
# All Used Routes
  resources :races
  resources :lengths, only: [:index, :create]
  resources :users, only: [:index, :show, :create]

  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/authorized_user", to: "users#show"
```

## Fork and Clone

Feel free to fork and clone this to use as your own!
Be aware of the seeded data.

## Contributing

Suggestions are welcome.