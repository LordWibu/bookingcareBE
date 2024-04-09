import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';
import specialtyControllers from "../controllers/specialtyControllers";
import clinicControllers from "../controllers/clinicController";
import newsControllers from "../controllers/newsController";
import contactController from "../controllers/contactController";
import reasonController from "../controllers/reasonController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUssers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.postInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getdetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraDoctorInfoById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    router.get('/api/get-list-patient-for-doctor-1', doctorController.getListPatientForDoctor1);
    router.get('/api/get-list-patient-for-doctor-2', doctorController.getListPatientForDoctor2);
    router.post('/api/send-remedy', doctorController.sendRemedy)

    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)
    router.post('/api/confirm-book-appointment', patientController.postConfirmBookAppointment)

    router.post('/api/create-new-specialty', specialtyControllers.createSpecialty)
    router.get('/api/get-all-specialty', specialtyControllers.getAllSpecialties)
    router.put('/api/update-specialty', specialtyControllers.updateSpecialties)
    router.delete('/api/delete-specialty', specialtyControllers.deleteSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyControllers.getDetailSpecialtyById)

    router.post('/api/create-new-clinic', clinicControllers.createClinic)
    router.get('/api/get-all-clinic', clinicControllers.getAllClinic)
    router.get('/api/get-detail-clinic-by-id', clinicControllers.getDetailClinicById)
    router.put('/api/update-clinic', clinicControllers.updateClinic)
    router.delete('/api/delete-clinic', clinicControllers.deleteClinic)

    router.post('/api/create-news', newsControllers.createNews)
    router.get('/api/get-all-news', newsControllers.getAllNews)
    router.get('/api/get-detail-news-by-id', newsControllers.getDetailNewsById)
    router.put('/api/update-news', newsControllers.updateNews)
    router.delete('/api/delete-news', newsControllers.deleteNews)

    router.post('/api/create-contact', contactController.createContact)
    router.get('/api/get-all-contact', contactController.getAllContact)
    router.get('/api/get-detail-contact-by-id', contactController.getDetailContactById)
    router.put('/api/send-feedback/:id', contactController.sendFeedback)

    router.get('/api/get-all-booking', patientController.getAllBooking)
    router.delete('/api/delete-booking', patientController.deleteBooking)

    router.post('/api/create-new-reason', reasonController.createReason)
    router.get('/api/get-all-reason', reasonController.getAllReasons)
    router.get('/api/get-detail-reason-by-id', reasonController.getDetailReasonById)
    router.put('/api/update-reason', reasonController.updateReason)
    router.delete('/api/delete-reason', reasonController.deleteReason)

    return app.use("/", router);
}

module.exports = initWebRoutes;