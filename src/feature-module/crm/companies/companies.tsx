import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { all_routes } from "../../router/all_routes";
import CompanyContextProvider, { companiesContext } from "./context/companies.context";
import { useDispatch, useSelector } from "react-redux";
import NewCompany from "./new-company";
import {
  setActivityTogglePopup,
  setActivityTogglePopupTwo,
  setAddTogglePopupTwo,
} from "../../../core/data/redux/commonSlice";
import Select from "react-select";
import {
  duration,
  optionssymbol,
  priorityList,
  project,
  salestypelist,
  socialMedia,
  status,
  tagInputValues,
} from "../../../core/common/selectoption/selectoption";
import DatePicker from "react-datepicker";
import DefaultEditor from "react-simple-wysiwyg";
import CollapseHeader from "../../../core/common/collapse-header";
import Table from "../../../core/common/dataTable/index";
import { SelectWithImage2 } from "../../../core/common/selectWithImage2";
import { companiesData } from "../../../core/data/json/companiesData";
import { TagsInput } from "react-tag-input-component";
import { Modal } from "react-bootstrap";
import GenericAntdTable from "../../../core/common/dynamicForm/dynamicTable";
import PageMaster from "../../../core/common/header/page-header";
import { CompaniesData } from "./data";


const CompaniesWrapper = () => {
  return (
    <CompanyContextProvider>
      <Companies />
    </CompanyContextProvider>
  );
}

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [owner, setOwner] = useState(["Collab"]);
  const companyCtx = useContext(companiesContext);
  const [localdata, setLocalData] = useState({});
  const addTogglePopupTwo = useSelector(
    (state: any) => state?.addTogglePopupTwo
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };

  const dispatch = useDispatch();

  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );
  const activityToggleTwo = useSelector(
    (state: any) => state?.activityTogglePopupTwo
  );

  const data = companiesData;
  const route = all_routes;
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    companiesData.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  // Call initializeStarsState once when the component mounts
  React.useEffect(() => {
    initializeStarsState();
    setLocalData(CompaniesData);
  }, []);

  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };


  return (
    <>
      <PageMaster data={localdata} pageCtx={companyCtx} formData={CompaniesData}>
        <></>
        <div className="modal fade" id="delete_contact" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Companies?</h4>
                  <p className="mb-0">
                    Company ”NovaWaveLLC” from your Account.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger" data-bs-dismiss="modal">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add_2"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-semibold">Add New Deals</h5>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="offcanvas-body">
            <form>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Deal Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">
                        Pipeine <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Select
                      className="select2"
                      options={salestypelist}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={status}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Deal Value<span className="text-danger"> *</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={optionssymbol}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Period <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={duration}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Period Value <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Contact <span className="text-danger">*</span>
                    </label>
                    <SelectWithImage2 />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">
                      Project <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={project}
                      defaultValue={tagInputValues}
                      isMulti
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Due Date <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-calendar-check" />
                      </span>
                      <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Expected Closing Date{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-calendar-check" />
                      </span>

                      <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate1}
                        onChange={handleDateChange1}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Assignee <span className="text-danger">*</span>
                    </label>
                    <SelectWithImage2 />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Follow Up Date <span className="text-danger">*</span>
                    </label>
                    <div className="icon-form">
                      <span className="form-icon">
                        <i className="ti ti-calendar-check" />
                      </span>
                      <DatePicker
                        className="form-control datetimepicker deals-details"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Source <span className="text-danger">*</span>
                    </label>

                    <Select
                      className="select2"
                      options={socialMedia}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Tags <span className="text-danger">*</span>
                    </label>
                    <TagsInput
                      // className="input-tags form-control"
                      value={owner}
                      onChange={setOwner}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Priority <span className="text-danger">*</span>
                    </label>
                    <Select
                      className="select2"
                      options={priorityList}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="col-form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <DefaultEditor className="summernote" />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="btn btn-light me-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <NewCompany data={localdata} />

        <Modal show={openModal} onHide={() => setOpenModal(false)}>

          <div className="modal-header border-0 m-0 justify-content-end">
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setOpenModal(false)}
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="modal-body">
            <div className="success-message text-center">
              <div className="success-popup-icon bg-light-blue">
                <i className="ti ti-medal" />
              </div>
              <h3>Deal Created Successfully!!!</h3>
              <p>View the details of deal, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link
                  to="#"
                  className="btn btn-light"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Link>
                <Link to={route.companyDetails} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={openModal2} onHide={() => setOpenModal2(false)}>
          <div className="modal-header border-0 m-0 justify-content-end">
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setOpenModal2(false)}
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="modal-body">
            <div className="success-message text-center">
              <div className="success-popup-icon bg-light-blue">
                <i className="ti ti-user-plus" />
              </div>
              <h3>Company  Created Successfully!!!</h3>
              <p>View the details of Company, created</p>
              <div className="col-lg-12 text-center modal-btn">
                <Link
                  to="#"
                  className="btn btn-light"
                  onClick={() => setOpenModal2(false)}
                >
                  Cancel
                </Link>
                <Link to={route.companyDetails} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </Modal>

      </PageMaster>

    </>
  );
};

export default CompaniesWrapper;
