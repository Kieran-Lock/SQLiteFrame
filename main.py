from schema import Person, Car, database
from pprint import pprint
from datetime import date
from sqliteframe import JoinTypes, OrderTypes


insert_person_1 = Person.insert_into({
    Person.national_insurance_number: "1234-Child",
    Person.first_name: "Anonymous",
    Person.last_name: "Anonymous",
    Person.date_of_birth: date(2005, 4, 20)
})
insert_person_2 = Person.insert_into({
    Person.national_insurance_number: "5678-Adult",
    Person.first_name: "John",
    Person.last_name: "Doe",
    Person.date_of_birth: date(2000, 1, 24)
})
insert_person_3 = Person.insert_into({
    Person.national_insurance_number: "9123-Adult",
    Person.first_name: "Mary",
    Person.last_name: "Jane",
    Person.date_of_birth: date(1987, 12, 2)
})
insert_car_1 = Car.insert_into({
    Car.number_plate: "AB12 CDE",
    Car.name: "Skyline R34",
    Car.brand: "Nissan",
    Car.price: 55_000,
    Car.date_purchased: date(2020, 10, 29),
    Car.supercar: True,
    Car.owner: Person["1234-Child"]
})
insert_car_2 = Car.insert_into({
    Car.number_plate: "FG34 HIJ",
    Car.name: "FR-V",
    Car.brand: "Honda",
    Car.price: 6_300,
    Car.date_purchased: date(2022, 3, 16),
    Car.owner: Person["5678-Adult"],
    Car.reg_document: b"Honda FR-V Registration Document"
})
insert_car_3 = Car.insert_into({
    Car.number_plate: "KL56 MNO",
    Car.name: "GTR R35",
    Car.brand: "Nissan",
    Car.price: 60_000,
    Car.date_purchased: date(2010, 7, 9),
    Car.supercar: True,
    Car.owner: Person["1234-Child"]
})
insert_car_4 = Car.insert_into({
    Car.number_plate: "PQ78 RST",
    Car.name: "Cube",
    Car.brand: "Nissan",
    Car.price: 8_000,
    Car.owner: Person["9123-Adult"]
})
set_person = Person.set({
    Person.national_insurance_number: "1234-Adult",
    Person.first_name: "Very",
    Person.last_name: "Rich"
}).where(
    (Person.first_name == "Anonymous") & (Person.last_name == "Anonymous")
)
select_car = Person.select(Person.last_name, Car.name, Person.first_name, Car.price, Car.reg_document).join(
    Car, Car.owner == Person.national_insurance_number, join_type=JoinTypes.LEFT
).where(
    Car.brand == "Nissan"
).order_by(
    Car.date_purchased, (OrderTypes.DESCENDING, OrderTypes.NULLS_FIRST)
)


with database.connection():
    insert_person_1.execute()
    insert_person_2.execute()
    insert_person_3.execute()
    insert_car_1.execute()
    insert_car_2.execute()
    insert_car_3.execute()
    insert_car_4.execute()
    set_person.execute()
    for record in select_car.execute():
        pprint(record)
    Car.drop_table().execute()
    Person.drop_table().execute()
