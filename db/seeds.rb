# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


u1 = User.create(name: "Benjamin Rasmussen", age: 16, photo: "https://images.thestar.com/IXQPuC-sKhnk-yS140dxxjL9KV0=/400x753/smart/filters:cb(2700061000):format(webp)/https://www.thestar.com/content/dam/thestar/sports/amateur/2010/11/04/distance_runners_unbeaten_streak_on_the_line/pdxcountryjpg.jpeg", username: "benrass", email: "benras@yahoo.com", password: "abcd")
u2 = User.create(name: "Michaela Brown", age: 23, photo: "https://i.imgur.com/0f0OaGa.jpg", username: "michaelanbrown", email: "m_brownbrown@yahoo.com", password: "1234")
u3 = User.create(name: "Maya Terrell", age: 47, photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Kathrine_Switzer_at_the_2011_Berlin_Marathon_Expo.jpg/330px-Kathrine_Switzer_at_the_2011_Berlin_Marathon_Expo.jpg", username: "mterrell", email: "mterrell@gmail.com", password: "5678")

l1 = Length.create(distance: 26.2, measurement: "mi")
l2 = Length.create(distance: 5, measurement: "km")
l3 = Length.create(distance: 10, measurement: "km")

e1 = Race.create(name: "Boston Marathon", year: 2022, duration: "04:35:58",user_id: u1.id, length_id: l1.id)
e2 = Race.create(name: "Run to Feed the Hungry", year: 2018, duration: "00:55:23", user_id: u2.id, length_id: l3.id)
e3 = Race.create(name: "Boston Marathon", year: 2022, duration: "00:38:35", user_id: u3.id, length_id: l2.id)

# Create a custom route that takes in an parameter of a year. You can assume the year will come in as a 4 digit number. Use the year to find all race results after that year. Then render back the users who are associated with those races. If no races are found render a message that says so.

#year is in races - races controller