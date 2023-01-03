"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "friends",
      [
        {
          requestee: "tester1",
          requestor: "auth0|63aea209ac231151d6a252f7",
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
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester1",
          requestor: "auth0|63b1977b057a048253326ae8",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester2",
          requestor: "auth0|63b1977b057a048253326ae8",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester3",
          requestor: "auth0|63b1977b057a048253326ae8",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63b1977b057a048253326ae8",
          requestor: "a1b2c3d4e5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63b1977b057a048253326ae8",
          requestor: "f1g2h3i4j5",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester1",
          requestor: "auth0|63b41dde057a04825332750b",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester2",
          requestor: "auth0|63b41dde057a04825332750b",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester3",
          requestor: "auth0|63b41dde057a04825332750b",
          status: "accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63b41dde057a04825332750b",
          requestor: "a1b2c3d4e5",
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63b41dde057a04825332750b",
          requestor: "f1g2h3i4j5",
          status: "accepted",
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
