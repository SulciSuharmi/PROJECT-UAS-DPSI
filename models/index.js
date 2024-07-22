const Sequelize = require('sequelize');
const sequelize = require('../config/database');



const Akun = require('./akun')(sequelize);
const AnggotaPerpustakaan = require('./anggotaPerpustakaan')(sequelize);
const Buku = require('./buku')(sequelize);
const TransaksiPeminjaman = require('./transaksiPeminjaman')(sequelize);
const Pengembalian = require('./pengembalian')(sequelize);
const Perpanjangan = require('./perpanjangan')(sequelize);
const DetailPeminjaman = require('./detailPeminjaman')(sequelize);
const DetailPengembalian = require('./detailPengembalian')(sequelize);



Akun.hasOne(AnggotaPerpustakaan, { foreignKey: 'username' });
AnggotaPerpustakaan.belongsTo(Akun, { foreignKey: 'username' });

Buku.hasMany(TransaksiPeminjaman, { foreignKey: 'kode_buku' });
TransaksiPeminjaman.belongsTo(Buku, { foreignKey: 'kode_buku' });

AnggotaPerpustakaan.hasMany(TransaksiPeminjaman, { foreignKey: 'id_anggota' });
TransaksiPeminjaman.belongsTo(AnggotaPerpustakaan, { foreignKey: 'id_anggota' });

TransaksiPeminjaman.hasMany(DetailPeminjaman, { foreignKey: 'id_peminjaman' });
DetailPeminjaman.belongsTo(TransaksiPeminjaman, { foreignKey: 'id_peminjaman' });

TransaksiPeminjaman.hasMany(Perpanjangan, { foreignKey: 'id_peminjaman' });
Perpanjangan.belongsTo(TransaksiPeminjaman, { foreignKey: 'id_peminjaman' });

TransaksiPeminjaman.hasMany(Pengembalian, { foreignKey: 'id_peminjaman' });
Pengembalian.belongsTo(TransaksiPeminjaman, { foreignKey: 'id_peminjaman' });

Pengembalian.hasMany(DetailPengembalian, { foreignKey: 'id_pengembalian' });
DetailPengembalian.belongsTo(Pengembalian, { foreignKey: 'id_pengembalian' });

const models = {
  Akun
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = {
    sequelize,
    Akun,
    AnggotaPerpustakaan,
    Buku,
    TransaksiPeminjaman,
    Pengembalian,
    Perpanjangan,
    DetailPeminjaman,
    DetailPengembalian,
    models
};
