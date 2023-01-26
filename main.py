from schema import Person, Car, database
from pprint import pprint


insert_person_1 = Person.insert_into({
    Person.national_insurance_number: "1234-Child",
    Person.first_name: "Anonymous",
    Person.last_name: "Name",
    Person.age: 17
})
insert_person_2 = Person.insert_into({
    Person.national_insurance_number: "5678-Adult",
    Person.first_name: "John",
    Person.last_name: "Doe",
    Person.age: 23
})
insert_car_1 = Car.insert_into({
    Car.number_plate: "AB12 345",
    Car.name: "Skyline R34",
    Car.brand: "Nissan",
    Car.price: 55_000,
    Car.supercar: True,
    Car.owner: Person["1234-Child"]
})
insert_car_2 = Car.insert_into({
    Car.number_plate: "CD56 789",
    Car.name: "FR-V",
    Car.brand: "Honda",
    Car.price: 6_300,
    Car.supercar: False,
    Car.owner: Person["5678-Adult"]
})
set_person = Person.set({
    Person.national_insurance_number: "1234-Adult",
    Person.age: 18
}).where(
    (Person.first_name == "Kieran") & (Person.last_name == "Lock")
)
select_car = Person.select(Person.first_name, Person.last_name, Car.name, Car.brand).join(
    Car, Car.brand == "Nissan"
)


with database.connection():
    insert_person_1.execute()
    insert_person_2.execute()
    insert_car_1.execute()
    insert_car_2.execute()
    set_person.execute()
    for record in select_car.execute():
        pprint(record)
    Car.drop_table().execute()
    Person.drop_table().execute()
