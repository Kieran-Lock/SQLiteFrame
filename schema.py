from sqliteframe import Database, table, String, Boolean, Date, Time, ForeignKey, Blob, Float, Integer
from datetime import date, time
from pathlib import Path


database = Database(Path("./database.db"), output=True)


@table(database)
class Person:
    national_insurance_number = String(primary_key=True)
    first_name = String
    last_name = String
    date_of_birth = Date


@table(database)
class Car:
    number_plate = String(primary_key=True)
    name = String
    brand = String(default="Unknown")
    price = Float
    seats = Integer(default=5)
    date_purchased = Date(nullable=True, default=date(2000, 1, 1))
    time_purchased = Time(nullable=True, default=time(0, 0, 0))
    supercar = Boolean(default=False)
    owner = ForeignKey(Person)
    reg_document = Blob(default=b"No documents.")
