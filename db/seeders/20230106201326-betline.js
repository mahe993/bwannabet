"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "betlines",
      [
        {
          bet_type: "custom",
          bet_description: "It will rain on second feb",
          bet_odds: 3.5,
          min_bet: 1,
          max_bet: 100,
          closing_time: "2023-02-02T00:00:00.000Z",
          verification_time: "2023-02-02T00:00:00.000Z",
          bet_status: "open",
          user_id: "auth0|63aea209ac231151d6a252f7",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          bet_type: "custom",
          bet_description: "Yew Wee wear black shirt on 10th Jan 2023",
          bet_odds: 1.5,
          min_bet: 1,
          max_bet: 100,
          closing_time: "2023-01-09T00:00:00.000Z",
          verification_time: "2023-01-10T00:00:00.000Z",
          bet_status: "verified",
          user_id: "auth0|63aea209ac231151d6a252f7",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          bet_type: "custom",
          bet_description: "$TSLA below $100 by 11 Jan 2023",
          bet_odds: 10,
          min_bet: 2,
          max_bet: 500,
          closing_time: "2023-01-05T00:00:00.000Z",
          verification_time: "2023-01-11T00:00:00.000Z",
          bet_status: "closed",
          user_id: "auth0|63aea209ac231151d6a252f7",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          bet_type: "custom",
          bet_description:
            "Zi hao and Samuel graduates from Rocket on 10th Jan 2023",
          bet_odds: 1.1,
          min_bet: 10,
          max_bet: 100,
          closing_time: "2023-01-10T18:00:00.000Z",
          verification_time: "2023-01-10T19:00:00.000Z",
          bet_status: "open",
          user_id: "auth0|63aea209ac231151d6a252f7",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("betlines", null, {});
  },
};
