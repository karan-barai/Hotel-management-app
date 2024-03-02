-- CreateTable
CREATE TABLE "Booking_details" (
    "Booking_details_id" TEXT NOT NULL,
    "Booking_id" TEXT NOT NULL,
    "Room_id" TEXT,
    "adults" INTEGER,
    "Children" INTEGER,
    "Extra_person" INTEGER,

    CONSTRAINT "Booking_details_pkey" PRIMARY KEY ("Booking_details_id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "Booking_id" TEXT NOT NULL,
    "Booking_date" DATE NOT NULL,
    "Guest_id" TEXT NOT NULL,
    "Check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "Room_type" TEXT NOT NULL,
    "Booking_status" TEXT,
    "Rooms_booked" INTEGER NOT NULL,
    "Adults" INTEGER,
    "Children" INTEGER,
    "Extra_person" INTEGER,
    "Total_amount" MONEY NOT NULL,
    "Advance_received" MONEY,
    "Date_of_advance" DATE,
    "Balance_due" MONEY,
    "Due_date" DATE,
    "Payment_status" TEXT,
    "Sources" TEXT,
    "Special_request" TEXT,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("Booking_id")
);

-- CreateTable
CREATE TABLE "Floors" (
    "Floor_id" TEXT NOT NULL,
    "Hotel_id" TEXT NOT NULL,
    "Floor" INTEGER NOT NULL,
    "Floor plan" BYTEA,

    CONSTRAINT "Floors_pkey" PRIMARY KEY ("Floor_id")
);

-- CreateTable
CREATE TABLE "Hotels" (
    "Hotel_id" TEXT NOT NULL,
    "Hotel" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("Hotel_id")
);

-- CreateTable
CREATE TABLE "Room_types" (
    "Room_type" TEXT NOT NULL,
    "Colour" TEXT,
    "Description" TEXT,

    CONSTRAINT "Room_types_pkey" PRIMARY KEY ("Room_type")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "Room_id" TEXT NOT NULL,
    "Floor_id" TEXT NOT NULL,
    "Room" INTEGER NOT NULL,
    "Room_type" TEXT NOT NULL,
    "Maximum_guests" INTEGER NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("Room_id")
);

-- CreateTable
CREATE TABLE "guests" (
    "Guest_id" TEXT NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_name" TEXT NOT NULL,
    "Email" TEXT,
    "Phone" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Type_of_id" TEXT,
    "Id_details" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "Emergency_contact_person" TEXT,
    "Emergency_contact" TEXT,
    "GSTIN" TEXT,
    "GST_name" TEXT,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("Guest_id")
);

-- AddForeignKey
ALTER TABLE "Booking_details" ADD CONSTRAINT "Booking_id" FOREIGN KEY ("Booking_id") REFERENCES "Bookings"("Booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Booking_details" ADD CONSTRAINT "Room_id" FOREIGN KEY ("Room_id") REFERENCES "Rooms"("Room_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Guestid" FOREIGN KEY ("Guest_id") REFERENCES "guests"("Guest_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Room_type" FOREIGN KEY ("Room_type") REFERENCES "Room_types"("Room_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Floors" ADD CONSTRAINT "Hotel_id" FOREIGN KEY ("Hotel_id") REFERENCES "Hotels"("Hotel_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Floor_id" FOREIGN KEY ("Floor_id") REFERENCES "Floors"("Floor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "typeid" FOREIGN KEY ("Room_type") REFERENCES "Room_types"("Room_type") ON DELETE NO ACTION ON UPDATE NO ACTION;
