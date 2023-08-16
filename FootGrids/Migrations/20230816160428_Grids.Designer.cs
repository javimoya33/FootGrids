﻿// <auto-generated />
using System;
using FootGrids;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FootGrids.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230816160428_Grids")]
    partial class Grids
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FootGrids.Models.Grid", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Grids");
                });

            modelBuilder.Entity("FootGrids.Models.GridPista", b =>
                {
                    b.Property<int>("GridId")
                        .HasColumnType("int");

                    b.Property<int>("PistaId")
                        .HasColumnType("int");

                    b.HasKey("GridId", "PistaId");

                    b.HasIndex("PistaId");

                    b.ToTable("GridsPista");
                });

            modelBuilder.Entity("FootGrids.Models.Pista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.HasKey("Id");

                    b.ToTable("Pistas");
                });

            modelBuilder.Entity("FootGrids.Models.GridPista", b =>
                {
                    b.HasOne("FootGrids.Models.Grid", "Grids")
                        .WithMany("GridsPistas")
                        .HasForeignKey("GridId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FootGrids.Models.Pista", "Pistas")
                        .WithMany("GridsPistas")
                        .HasForeignKey("PistaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Grids");

                    b.Navigation("Pistas");
                });

            modelBuilder.Entity("FootGrids.Models.Grid", b =>
                {
                    b.Navigation("GridsPistas");
                });

            modelBuilder.Entity("FootGrids.Models.Pista", b =>
                {
                    b.Navigation("GridsPistas");
                });
#pragma warning restore 612, 618
        }
    }
}
