from sqliteframe import Database, Table, String, Integer, Boolean, Date, Time, ForeignKey


database = Database("database.db", output=True)


@Table(database)
class Person:
    national_insurance_number = String(primary_key=True)
    first_name = String
    last_name = String
    age = Integer


@Table(database)
class Car:
    number_plate = String(primary_key=True)
    name = String
    brand = String
    price = Integer
    date_purchased = Date(nullable=True)
    time_purchased = Time(nullable=True)
    supercar = Boolean
    owner = ForeignKey(Person)
