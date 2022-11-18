const Hiring = require('../models/hiring')
const transport = require('../services/nodemailer')

class HiringController {
  static submit(req, res) {     
    Hiring.create(req.body)
    .then(candidate => {
      transport.sendMail({
        from: process.env.SENDER_EMAIL,
        to: 'admin@yogzan.com',
        subject: `Candidate - ${candidate.fullname}`,
        html: `
          <h1>Hi Yogzan, you have new candidate !</h1>
          <hr/>
          <p><b>Nama Lengkap :</b> ${candidate.fullname}</p>
          <p><b>Nama Panggilan :</b> ${candidate.nickname}</p>
          <p><b>Email :</b> ${candidate.email}</p>
          <p><b>Nomor Whatsapp :</b> ${candidate.phone}</p>
          <p><b>Alamat Domisili saat ini :</b> ${candidate.address}</p>
          <hr/>
          <p><b>Jenis Pemotretan yang pernah diambil :</b> ${candidate.photoshoot}</p>
          <p><b>Pengalaman Memotret :</b> ${candidate.experience}</p>
          <p><b>Seri Kamera yang dimiliki :</b> ${candidate.camera}</p>
          <p><b>Seri Lensa yang dimiliki :</b> ${candidate.lens}</p>
          <p><b>Aksesoris lain yang dimiliki :</b> ${candidate.accessories}</p>
          <p><b>Alokasi waktu untuk Yogzan :</b> ${candidate.workingHour}</p>
          <p><b>Expected Fee :</b>${candidate.fee}</p>
          <p><b>CV :</b> ${candidate.cv}</p>
          <p><b>Portfolio :</b> ${candidate.portfolio}</p>
        `
      }, (err, info) => {
        if(err) {
          console.error(err)
          res.status(500).json({msg: 'mailer error'})
        } else {
          res.status(201).json(candidate)
        }
      })
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err);
    })
  }

  static findAll(req, res) {
    const requestedPage = req.query.page ? parseInt(req.query.page) : 1
    const page = Math.max(0, requestedPage)
    const perPage = req.query.limit || 10
    let totalData = 0
    Hiring.count()
      .then(num => {
        totalData = num
        return Hiring.find()
          .sort({createdAt: 'desc'})
          .limit(perPage)
          .skip(perPage * (page-1))
      })
      .then(candidates => {
        const meta = {
          page: requestedPage,
          totalData,
          totalDataOnPage: totalData < perPage ? totalData : perPage,
          totalPage: Math.ceil(totalData / perPage)
        }
        res.status(200).json({data: candidates, meta})
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static save(req, res) {
    console.log(req.body)
  }
}

module.exports = HiringController