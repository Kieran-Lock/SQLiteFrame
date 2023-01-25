from schema import Person, Car, database
from sqliteframe import Wildcards
from pprint import pprint


insert_person = Person.insert_into({
    Person.national_insurance_number: "1234-Child",
    Person.first_name: "Kieran",
    Person.last_name: "Lock",
    Person.age: 17
})
insert_car = Car.insert_into({
    Car.number_plate: "AB12 345",
    Car.name: "Skyline R34",
    Car.brand: "Nissan",
    Car.price: 55_000,
    Car.supercar: True,
    Car.owner: Person["1234-Child"]
})
set_person = Person.set({
    Person.national_insurance_number: "1234-Adult",
    Person.age: 18
})
select_car = Car.select(Wildcards.All)


with database.connection():
    insert_person.execute()
    insert_car.execute()
    set_person.execute()
    for record in select_car.execute():
        pprint(record)
    Car.drop_table().execute()
    Person.drop_table().execute()
