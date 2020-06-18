const mongoose = require('mongoose');
const schema = mongoose.Schema;

const resumeInfoSchema = new schema({
    basics: {
        name: { type: String },
        label: { type: String },
        picture: { type: schema.Types.Mixed },
        email: { type: String },
        phone: { type: String },
        website: { type: String },
        summary: { type: String },
        
    
  },
    profiles: [{
        network: { type: String },
        username: { type: String },
        url: { type: String }
      }]
    ,
    location: {
        address: { type: String },
        postalCode: { type: String },
        city: { type: String },
        countryCode: { type: String },
        region:{ type: String }
      },
      work: [{
        company: { type: String },
        position: { type: String },
        website: { type: String },
        startDate: { type: Date/* , default: Date.now, required: true */ },
        endDate: { type: Date/* , default: Date.now, required: true */ },
        summary: { type: String },
        highlights: [{ type: String}]
      }],
      volunteer: [{
        organization: { type: String },
        position: { type: String },
        website: { type: String },
        startDate: { type: Date/* , default: Date.now, required: true */ },
        endDate: { type: Date/* , default: Date.now, required: true */ },
        summary: { type: String } ,
        highlights: [{ type: String}],
      
      }],
      education: [{
        institution: { type: String },
        area: { type: String },
        studyType:{ type: String },
        startDate: { type: Date/* , default: Date.now, required: true */ },
        endDate: { type: Date/* , default: Date.now, required: true */ },
        gpa: {type:Number},
        courses: [
            { type: String }
        ]
      }],
      awards: [{
        title: { type: String },
        date: { type: Date/* , default: Date.now, required: true */ },
        awarder: { type: String },
        summary: { type: String },
      }],
      publications: [{
        name: { type: String },
        publisher: { type: String },
        releaseDate: { type: Date/* , default: Date.now, required: true */ },
        website: { type: String },
        summary:{ type: String }
      }],
      skills: [{
        name: { type: String },
        level: { type: String },
        keywords: [
            { type: String }
        ]
      }],
      languages: [{
        language: { type: String },
        fluency: { type: String },
      }],
      interests: [{
        name: { type: String },
        keywords: [
            { type: String }
        ]
      }],
      references: [{
        name: { type: String },
        reference: { type: String }
      }],
      is_deleted:{type:Boolean,default:false},
      is_active:{type:Boolean,default:true},
      added_at: { type: Date/* , default: Date.now, required: true */ },
      added_by: { type: schema.Types.ObjectId, ref: 'users' },
      updated_at: { type: Date },
      updated_by: { type: schema.Types.ObjectId, ref: 'users' },
    

});
module.exports = resumeInfo = mongoose.model('resumeInfos', resumeInfoSchema);
