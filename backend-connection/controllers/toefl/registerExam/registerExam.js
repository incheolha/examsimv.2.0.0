const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Toefl = require('../../../models/toefl/toeflModel');
const User = require('../../../models/users/userModel');

exports.register_get_all = (req, res, next) => {

  /*
     이곳에서 언제든지 user._Id와 Toefl.writer.objectId를 비교하여 해당
     관리자가 생성한 것만 보여주게 할수가 있다. 하지만 지금은 모두가 다 볼수 있도록 구성하였다
    token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
  */
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.permissionTag);
    console.log("decoded: " + decoded.user.email);

  Toefl.find()
              // .populate('writer', 'name email permissionTag')
              // .sort({'toeflNo': -1})                           // 내림차순 sorting 구문
              // .exec()
              .then(toefls => {
                console.log('register toefls list 길이', toefls.length);
                  res.status(200).json({
                      message: 'get successfully',
                      toefls: toefls
                  });
              })
              .catch(err => {
                  res.status(500).json({
                    title: 'Toefle Registration List Error',
                    message: 'Toefle Registration List can not be listed'
                  });
              });

}

//토플시험 등록 신청시 반드시 parameters로 toeflNo를 가지고 들어오기
exports.register_create = (req, res, next) => {
    console.log('this is the upload되는 image와 audio파일 길이: ' + req.files.length);

    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.email);
    console.log("toefl desc: " + req.body.toeflDesc);
    console.log("toefl Completion Tag: " + req.body.toeflCompletionTag);
    console.log("toefl Level: " + req.body.toeflLevel);

    //만일 req.file이 없으면 dqfault.png로 설정하는 과정
    if (req.files.length === 0) {
      temp_image_filename = 'toeflLogoDefault.png';
      temp_audio_filename = 'toeflAudioDefault.mp3';

  } else if (req.files.length === 1) {

          if (req.files[0].mimetype === 'image/png' ||
              req.files[0].mimetype === 'image/jpeg' ||
              req.files[0].mimetype === 'image/jpg' ||
              req.files[0].mimetype === 'image/gif' ) {

                      temp_image_filename = req.files[0].filename;
                      temp_audio_filename = 'toeflAudioDefault.mp3';
                      console.log('req.files길이가 1인경우 이미지 파일명', temp_image_filename);
                      console.log('req.files길이가 1인경우 오디오 파일명', temp_image_filename);
          } else {
            temp_image_filename = 'toeflLogoDefault.png';
            temp_audio_filename = 'toeflAudioDefault.mp3';
          }
  } else if (req.files.length === 2) {

            if (req.files[0].mimetype === 'image/png' ||
                req.files[0].mimetype === 'image/jpeg' ||
                req.files[0].mimetype === 'image/jpg' ||
                req.files[0].mimetype === 'image/gif' ) {

                    temp_image_filename = req.files[0].filename;

              } else {
                temp_image_filename = 'toeflLogoDefault.png';
              }

              if (req.files[1].mimetype === 'audio/mp3' ||
                  req.files[1].mimetype === 'audio/mpeg' ||
                  req.files[1].mimetype === 'audio/wav' ||
                  req.files[1].mimetype === 'audio/swf' )
              {
                  temp_audio_filename = req.files[1].filename;

              } else {
                temp_audio_filename = 'toeflAudioDefault.mp3';
              }
              console.log('req.files길이가 2인경우 이미지 파일명', temp_image_filename);
              console.log('req.files길이가 2인경우 오디오 파일명', temp_audio_filename);
  }
    temp_image_url = 'http://localhost:3000/uploads/' + temp_image_filename;
    temp_audio_url = 'http://localhost:3000/uploads/' + temp_audio_filename;

    console.log('this is the first point:'+temp_image_url);
    console.log('this is the second point: '+temp_audio_url);

        User.findById(decoded.user._id, (err, user) => {
        if (err) {
            return res.status(500).json({
              title: 'Toefle Registration Creation Error',
              message: 'The teacher is not existed'
            });
        } else {

            Toefl.findOne({ toeflNo: req.params.toeflNo })
            .exec()
            .then( toeflDoc => {
                if (toeflDoc) {
                    return res.status(409).json({
                        message: 'Toefl No. is already exists'
                    });
                } else {
                    const toefl = new Toefl({
                        toeflNo: req.params.toeflNo,
                        toeflDesc: req.body.toeflDesc,
                        toeflLevel: req.body.toeflLevel,
                        toeflCompletionTag: req.body.toeflCompletionTag,
                        toeflImage: temp_image_url,
                        toeflAudio: temp_audio_url,
                        readingDesc: req.body.readingDesc,
                        listeningDesc: req.body.readingDesc,
                        writingDesc: req.body.readingDesc,
                        speakingDesc: req.body.readingDesc,
                        writer: user._id
                     });

                    console.log(toefl);

                    toefl
                        .save()
                        .then(result => {

                            user.toeflId.push(result.toObject());  //toefl이 정상적으로 save가 되면 user doc에 toeflId를 저장하는구문
                            user.save();
                            res.status(200).json({
                                message: 'Toefl Registration is saved successfully',
                                toefl: result
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({
                              title: 'Toefle Registration Creation Error',
                              message: 'Toefle Exam can not be registered'

                            });
                        });
                }
            });

        }
    });

};

exports.register_update = (req, res, next) => {
    console.log('업로드 파일길이:'+req.files.length);
    //token 속에 들어있는 payload 값인 user doc에 관한 내용을 decoded하는과정
    const decoded = jwt.decode(req.query.token);
    console.log("decoded: " + decoded.user.email);
    console.log('update description :' + req.body.toeflDesc);
    console.log('Update Date: '+ Date());
    const id = req.params.toeflNo;
    updateOperation = {};
    temp_audio_url = '';
    temp_image_url = '';

    //만일 req.file이 없으면 dqfault.png로 설정하는 과정
    if (req.files.length === 0) {
      console.log('지점 점검부분: 0')
        temp_image_url = req.body.toeflImage;
        temp_audio_url = req.body.toeflAudio;

    // } else if (req.files.length < 2) {

    //   if (req.files[0].mimetype === 'image/png' ||
    //                                               req.files[0].mimetype === 'imagejpeg' ||
    //                                               req.files[0].mimetype === 'image/jpg' ||
    //                                               req.files[0].mimetype === 'image/gif'


    // ) {
    //     temp_image_filename = req.files[i].filename;
    //     temp_audio_filename = req.body.toeflAudio;
    //   } else {
    //     temp_image_filename = req.body.toeflImage;
    //     temp_audio_filename = req.files[i].filename;
    //   }

     } else {

      console.log('지점 점검부분: 1')

        for (let i = 0; i < req.files.length; i++) {

            if (req.files[i].mimetype === 'image/png' ||
                req.files[i].mimetype === 'image/jpeg' ||
                req.files[i].mimetype === 'image/jpg' ||
                req.files[i].mimetype === 'image/gif' )
                {
                temp_image_filename = req.files[i].filename;
                temp_image_url = 'http://localhost:3000/uploads/' + temp_image_filename;

            } else if (req.files[i].mimetype === 'audio/mp3' ||
                       req.files[i].mimetype === 'audio/wav' ||
                       req.files[i].mimetype === 'audio/ogg' )
                        {
                temp_audio_filename = req.files[i].filename;
                temp_audio_url = 'http://localhost:3000/uploads/' + temp_audio_filename;
            }
        }
        if (temp_image_url === '') {
            temp_image_url = req.body.toeflImage;
        }
        if (temp_audio_url === '') {
            temp_audio_url = req.body.toeflAudio;
        }
    }

        updateOperation = {
                          toeflNo: req.params.toeflNo,
                          toeflDesc: req.body.toeflDesc,
                          toeflLevel: req.body.toeflLevel,
                          toeflCompletionTag: req.body.toeflCompletionTag,
                          toeflCreatedDate: Date(),
                          toeflImage: temp_image_url,
                          toeflAudio: temp_audio_url
          };

        Toefl.findOneAndUpdate({toeflNo : id }, { $set: updateOperation }, {new: true}, (err, toefl) => {
                    if (err) {
                                  console.log(err);
                                  res.status(500).json({
                                  title: 'Toefle Registration Update Error',
                                  message: 'Toefle Exam Registration can not be updated'
                                  });
                    }
                      console.log(toefl);
                      return res.status(200).json({
                        message: 'Toefl Updated',
                        toefl: toefl});
        })
};

exports.register_delete = (req, res, next) => {

   const decoded = jwt.decode(req.query.token);

   console.log(req.params.toeflId);
   console.log(decoded);

   Toefl.findOne({toeflNo: req.params.toeflId}, (err, toefl) => {
       if (err) {
           return res.status(500).json({
            title: 'Toefle Registration Delete Error',
            message: 'Toefle Exam Registration can not be deleted'
          });
       }
       console.log(toefl);
       if (!toefl) {
           return res.status(500).json({
            title: 'Toefle Registration Delete Error',
            message: 'Toefle Exam Registration can is not found'
           });
       }
       if (toefl.writer != decoded.user._id) {
           return res.status(401).json({
            title: 'Toefle Registration Delete Error',
            message: 'The Teacher is not matched'
           });
       }
       toefl.remove((err, result) => {
           if (err) {
               return res.status(500).json({
                title: 'Toefle Registration Delete Error',
                message: 'The Registered Toefl can not be removed'
            });
           }
           console.log(result);
           res.status(200).json({
               message: 'deleted Toefl Exam',
               obj: result
           });
       });
   });
};
