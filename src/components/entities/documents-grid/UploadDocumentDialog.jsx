import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";

const UploadDocuments = ({
  visible,
  onHide,
  onSave,
  setDocumentFile,
  documentfile,
  uploadstatus,
  uploadSuccessMsg,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const { getRootProps } = useDropzone({
    accept: {
      // "application/vnd.ms-excel": [".xls"],
      // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      //   ".xlsx",
      // ],
      "application/pdf": [".pdf"],
    },
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      clearErrors("documentfile");
      setDocumentFile(acceptedFiles[0]);
    },
    onDropRejected: () => {
      setError("documentfile", {
        type: "manual",
        message: "File must be pdf and less than 5MB.",
      });
    },
  });

  const onSubmit = (data) => {
    if (!documentfile) {
      setError("documentfile", {
        type: "manual",
        message: "File upload is required.",
      });
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("documents", documentfile);
      onSave(formData);
    }
  };

  return (
    <Dialog visible={visible} onHide={onHide} className="edit-contact-dialog">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="flex justify-content-between align-items-center pb-4">
          <p className="del-dialog-heading">{"Upload File"}</p>
          <Button
            icon="pi pi-times"
            className="p-close-button"
            onClick={onHide}
          />
        </div>
        {uploadstatus == "success" && (
          <div className="success-message w-full">
            <span className="pi pi-check mr-2 check-color"></span>
            <p>{uploadSuccessMsg}</p>
          </div>
        )}
        {/* {(uploadSuccessMsg || (emailArr && emailArr.length > 0)) && (
              <div className="deletion-msg w-full mb-3">
                <span className="pi pi-times-circle mr-2 cancel-color"></span>
                <p>
                  {emailArr} {message}
                </p>
              </div>
            )} */}
        <div className="formgrid grid document-upload">
          <div className="field col-6 pt-2">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Name"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.name ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.name && (
              <small className="error-message">{errors.name.message}</small>
            )}
          </div>
          <div className="field col-6 pt-2">
            <Controller
              name="type"
              control={control}
              rules={{ required: "Type is required." }}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={[
                    { label: "Contract", value: "Contract" },
                    { label: "General", value: "General" },
                  ]}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder="Select a Type"
                  style={{ width: "100%" }}
                />
              )}
            />
            {errors.type && (
              <small className="error-message">{errors.type.message}</small>
            )}
          </div>
          <div className="col-12 mt-1">
            <div {...getRootProps()} className="p-4 document-drag-drop">
              <div className="document-drag-drop-icon">
                <svg
                  width="73"
                  height="64"
                  viewBox="0 0 73 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8C0 3.625 3.5 0 8 0H28V16C28 18.25 29.75 20 32 20H48V24.875C38.75 27.5 32 36 32 46C32 53.5 35.625 60 41.125 64C40.75 64 40.375 64 40 64H8C3.5 64 0 60.5 0 56V8ZM48 16H32V0L48 16ZM54 28C60.375 28 66.25 31.5 69.5 37C72.75 42.625 72.75 49.5 69.5 55C66.25 60.625 60.375 64 54 64C47.5 64 41.625 60.625 38.375 55C35.125 49.5 35.125 42.625 38.375 37C41.625 31.5 47.5 28 54 28ZM56 38C56 37 55 36 54 36C52.875 36 52 37 52 38V44H46C44.875 44 44 45 44 46C44 47.125 44.875 48 46 48H52V54C52 55.125 52.875 56 54 56C55 56 56 55.125 56 54V48H62C63 48 64 47.125 64 46C64 45 63 44 62 44H56V38Z"
                    fill="var(--lara-light-green-700)"
                  />
                </svg>
              </div>
              <p>Drag & drop file here or click anywhere to choose file</p>
              <button type="button" className="edit-button">
                Select Files
              </button>
            </div>
            {errors.documentfile && (
              <small className="error-message">
                {errors.documentfile.message}
              </small>
            )}
          </div>
          <div className="col-6">
            <p>Supported formats: PDF, DOC, CSV, JPEG, PNG, TXT, XLS, XLSX.</p>
          </div>
          <div className="col-6 text-right">
            <p>Maximum file size: 5MB</p>
          </div>
          {documentfile && (
            <div className="field col-12 ">
              <p>Documents</p>
              <div className="uploaded-files">
                <div className="uploaded-file-item">
                  <div
                    onClick={() => setDocumentFile("")}
                    className="closeicon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9.79509 8.99997L13.1101 5.68497C13.1654 5.63347 13.2097 5.57137 13.2404 5.50237C13.2712 5.43337 13.2877 5.35889 13.289 5.28336C13.2904 5.20783 13.2765 5.13281 13.2482 5.06277C13.2199 4.99273 13.1778 4.9291 13.1244 4.87569C13.071 4.82228 13.0073 4.78017 12.9373 4.75188C12.8672 4.72359 12.7922 4.70969 12.7167 4.71103C12.6412 4.71236 12.5667 4.72889 12.4977 4.75963C12.4287 4.79038 12.3666 4.8347 12.3151 4.88997L9.00009 8.20497L5.68509 4.88997C5.57846 4.79061 5.43742 4.73652 5.2917 4.73909C5.14597 4.74166 5.00693 4.80069 4.90387 4.90375C4.80081 5.00681 4.74178 5.14585 4.73921 5.29158C4.73664 5.4373 4.79073 5.57834 4.89009 5.68497L8.20509 8.99997L4.89009 12.315C4.78475 12.4204 4.72559 12.5634 4.72559 12.7125C4.72559 12.8615 4.78475 13.0045 4.89009 13.11C4.99556 13.2153 5.13853 13.2745 5.28759 13.2745C5.43665 13.2745 5.57962 13.2153 5.68509 13.11L9.00009 9.79497L12.3151 13.11C12.4206 13.2153 12.5635 13.2745 12.7126 13.2745C12.8617 13.2745 13.0046 13.2153 13.1101 13.11C13.2154 13.0045 13.2746 12.8615 13.2746 12.7125C13.2746 12.5634 13.2154 12.4204 13.1101 12.315L9.79509 8.99997Z"
                        fill="#1F2937"
                      />
                    </svg>
                  </div>

                  <div>
                    <span className="file-icon">
                      <i className="pi pi-file-pdf"></i>
                    </span>
                    <span className="file-name">{documentfile.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-content-end gap-2">
          <button type="button" className="edit-button" onClick={onHide}>
          Cancel
          </button>
          <button type="submit" className="add-btn">
            {uploadstatus == "loading" ? (
              <ProgressSpinner
                className="white-spinner"
                style={{ width: "20px", height: "20px" }}
                strokeWidth="4"
              />
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

UploadDocuments.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  setDocumentFile: PropTypes.func,
  uploadstatus: PropTypes.bool,
  uploadSuccessMsg: PropTypes.string,
  documentfile: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
export default UploadDocuments;
