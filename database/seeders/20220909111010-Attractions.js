module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "attractions",
      [
        {
          name: "Taipei",
          geo_json:
            '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"city":"Taipei"},"geometry":{"type":"LineString","coordinates":[[121.51746869087219,25.046273379394695],[121.51749685406683,25.046268519413328]]}}]}',
        },
        {
          name: "Taichung",
          geo_json:
            '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"city":"Taichung"},"geometry":{"type":"LineString","coordinates":[[120.68645864725113,24.13755794057052],[120.6864908337593,24.137565283651107]]}}]}',
        },
        {
          name: "Kaohsiung",
          geo_json:
            '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"city":"Kaohsiung"},"geometry":{"type":"LineString","coordinates":[[120.30186474323271,22.639630038473012],[120.30187010765074,22.639674597991824]]}}]}',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("attractions", null, {});
  },
};
