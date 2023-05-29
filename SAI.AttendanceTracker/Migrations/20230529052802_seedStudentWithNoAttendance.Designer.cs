﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SAI.AttendanceTracker;

#nullable disable

namespace SAI.AttendanceTracker.Migrations
{
    [DbContext(typeof(SAIContext))]
    [Migration("20230529052802_seedStudentWithNoAttendance")]
    partial class seedStudentWithNoAttendance
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Attendance", b =>
                {
                    b.Property<int>("AttendanceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AttendanceID"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StudentID")
                        .HasColumnType("int");

                    b.HasKey("AttendanceID");

                    b.HasIndex("StudentID");

                    b.ToTable("Attendances");

                    b.HasData(
                        new
                        {
                            AttendanceID = 1,
                            Date = new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Attended",
                            StudentID = 1
                        },
                        new
                        {
                            AttendanceID = 2,
                            Date = new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Absent",
                            StudentID = 2
                        },
                        new
                        {
                            AttendanceID = 3,
                            Date = new DateTime(2023, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Excused",
                            StudentID = 3
                        });
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Note", b =>
                {
                    b.Property<int>("NoteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NoteID"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<int?>("StudentID")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoteID");

                    b.HasIndex("StudentID");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Student", b =>
                {
                    b.Property<int>("StudentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StudentID"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MiddleName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PinnedNoteID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("StudentID");

                    b.HasIndex("UserID");

                    b.ToTable("Students");

                    b.HasData(
                        new
                        {
                            StudentID = 1,
                            FirstName = "Abdurrahman",
                            LastName = "Alatas",
                            MiddleName = "\"Abe\"",
                            UserID = 1
                        },
                        new
                        {
                            StudentID = 2,
                            FirstName = "Alpacasso",
                            LastName = "Kennedy",
                            UserID = 1
                        },
                        new
                        {
                            StudentID = 3,
                            FirstName = "Hakuno",
                            LastName = "Kishinami",
                            MiddleName = "Zabiko",
                            UserID = 1
                        },
                        new
                        {
                            StudentID = 4,
                            FirstName = "Lelouch",
                            LastName = "Lamperouge",
                            UserID = 1
                        });
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserID = 1,
                            Email = "spooky@spooky.net",
                            Name = "spooky",
                            Password = "1234"
                        });
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Attendance", b =>
                {
                    b.HasOne("SAI.AttendanceTracker.Models.Student", null)
                        .WithMany("Attendances")
                        .HasForeignKey("StudentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Note", b =>
                {
                    b.HasOne("SAI.AttendanceTracker.Models.Student", null)
                        .WithMany("Notes")
                        .HasForeignKey("StudentID");
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Student", b =>
                {
                    b.HasOne("SAI.AttendanceTracker.Models.User", null)
                        .WithMany("Students")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.Student", b =>
                {
                    b.Navigation("Attendances");

                    b.Navigation("Notes");
                });

            modelBuilder.Entity("SAI.AttendanceTracker.Models.User", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
