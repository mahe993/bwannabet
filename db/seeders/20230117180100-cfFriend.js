"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "friends",
      [
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "tester1",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester2",
          requestor: "auth0|63aea209ac231151d6a252f7",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester3",
          requestor: "auth0|63aea209ac231151d6a252f7",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "a1b2c3d4e5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "f1g2h3i4j5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "x1y2z3a4b5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "m1n2o3p4q5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "h1i2j3k4l5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("friends", null, {});
  },
};
