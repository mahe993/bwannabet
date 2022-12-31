"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "tester1",
          username: "Tester 1",
          email: "admin@a.com",
          contact_number: 98761234,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "tester2",
          email: "tester2@tester.com",
          contact_number: 87655678,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "tester3",
          username: "Tester 3",
          email: "tester3@tester.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "a1b2c3d4e5",
          username: "John Smith",
          email: "johnsmith@unicornmail.com",
          contact_number: 12345678,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "x1y2z3a4b5",
          email: "sarahjohnson@mysticalmail.net",
          contact_number: 87654321,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "m1n2o3p4q5",
          username: "Jane Doe",
          email: "janedoe@fantasymail.org",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "h1i2j3k4l5",
          email: "jackdoe@enchantingmail.info",
          contact_number: 11223344,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "f1g2h3i4j5",
          username: "Bob Johnson",
          email: "bobjohnson@magicalmail.biz",
          contact_number: 44556677,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "t1u2v3w4x5",
          email: "emmajones@mysticmail.co.uk",
          contact_number: 99887766,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "r1s2t3u4v5",
          username: "Emily Williams",
          email: "emilywilliams@fantasymail.io",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};