import Job from "../models/job.model.js";
import Application from "../models/applications.js";
import moment from "moment";

import dotenv from 'dotenv';
dotenv.config();

export default class JobController {

    getIndex(req, res) {
      res.render('index', {});
    }

  
}
