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
          username: "Dwyane Johnson",
          profile_picture: JSON.stringify({
            downloadUrl:
              "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
            firebasePath: "https://example.com",
          }),
          email: "admin@a.com",
          contact_number: 98761234,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "tester2",
          email: "tester2@tester.com",
          profile_picture: JSON.stringify({
            downloadUrl:
              "https://xsgames.co/randomusers/assets/avatars/pixel/43.jpg",
            firebasePath: "https://example.com",
          }),
          contact_number: 87655678,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "tester3",
          username: "Dan Abramov",
          email: "tester3@tester.com",
          profile_picture: JSON.stringify({
            downloadUrl:
              "	https://xsgames.co/randomusers/assets/avatars/male/38.jpg",
            firebasePath: "https://example.com",
          }),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "a1b2c3d4e5",
          username: "NFT Scammer",
          email: "johnsmith@unicornmail.com",
          profile_picture: JSON.stringify({
            downloadUrl: "https://xsgames.co/randomusers/avatar.php?g=pixel",
            firebasePath: "https://example.com",
          }),
          contact_number: 12345678,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "x1y2z3a4b5",
          email: "sarahjohnson@mysticalmail.net",
          profile_picture: JSON.stringify({
            downloadUrl:
              "https://xsgames.co/randomusers/assets/avatars/female/15.jpg",
            firebasePath: "https://example.com",
          }),
          contact_number: 87654321,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "m1n2o3p4q5",
          username: "Jane Doe",
          email: "janedoe@fantasymail.org",
          profile_picture: JSON.stringify({
            downloadUrl: "https://xsgames.co/randomusers/avatar.php?g=female",
            firebasePath: "https://example.com",
          }),
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
          profile_picture: JSON.stringify({
            downloadUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
            firebasePath: "https://example.com",
          }),
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
          id: "auth0|63aea209ac231151d6a252f7", // MA HE'S ACCOUNT
          email: "mahe@admin.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|63b41dde057a04825332750b", // SAMUEL'S ACCOUNT
          email: "samuel@mail.net",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|63b1977b057a048253326ae8", // ZIHAO'S ACCOUNT 1
          email: "test7@gmail.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   id: "auth0|7C63b1977b057a048253326ae8", // ZIHAO'S ACCOUNT 2
        //   email: "samuel@mail.net",
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
