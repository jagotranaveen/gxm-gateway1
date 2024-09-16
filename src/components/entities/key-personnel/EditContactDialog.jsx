import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const EditContactDialog = ({
  visible,
  onHide,
  onSave,
  isAddMode,
  rowToEdit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: rowToEdit?.first_name || "",
      last_name: rowToEdit?.last_name || "",
      department: rowToEdit?.department || "",
      role: rowToEdit?.role || "",
      email: rowToEdit?.email || "",
      country: rowToEdit?.country || "",
      phone_code: rowToEdit?.phone_code || "",
      phone: rowToEdit?.phone || "",
    },
  });

  useEffect(() => {
    reset({
      first_name: rowToEdit?.first_name || "",
      last_name: rowToEdit?.last_name || "",
      department: rowToEdit?.department || "",
      role: rowToEdit?.role || "",
      email: rowToEdit?.email || "",
      country: rowToEdit?.country || "",
      phone_code: rowToEdit?.phone_code || "",
      phone: rowToEdit?.phone || "",
    });
  }, [rowToEdit, reset]);
  const onSubmit = (data) => {
    onSave(data);
    reset({
      first_name: "",
      last_name: "",
      department: "",
      role: "",
      email: "",
      country: "",
      phone_code: "",
      phone: "",
    });
  };

  const handleSkip = () => {
    reset({
      first_name: "",
      last_name: "",
      department: "",
      role: "",
      email: "",
      country: "",
      phone_code: "",
      phone: "",
    });
    onHide();
  };

  return (
    <Dialog visible={visible} onHide={onHide} className="edit-contact-dialog">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <p className="del-dialog-heading">
          {isAddMode ? "Add New Contact" : "Edit Contact"}
        </p>
        <p className="del-dialog-para mb-3">
          {isAddMode
            ? "Fill in the new contact's information below and hit add contact when ready!"
            : "Change the contact information and hit save changes when ready!"}
        </p>

        <div className="formgrid grid">
          <div className="field col-6">
            <label className="contact-label">First Name</label>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter First Name"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.first_name ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.first_name && (
              <small className="error-message">
                {errors.first_name.message}
              </small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Last Name</label>
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Last Name"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.last_name ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.last_name && (
              <small className="error-message">
                {errors.last_name.message}
              </small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Department</label>
            <Controller
              name="department"
              control={control}
              defaultValue=""
              rules={{ required: "Department is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Department"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.role ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.department && (
              <small className="error-message">
                {errors.department.message}
              </small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Role</label>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Role"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.role ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.role && (
              <small className="error-message">{errors.role.message}</small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Contact Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid.",
                },
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Email Address"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.email ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.email && (
              <small className="error-message">{errors.email.message}</small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Location</label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: "Location is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Location"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.country ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.country && (
              <small className="error-message">{errors.country.message}</small>
            )}
          </div>
          <div className="field col-12 mb-0">
            <label className="contact-label">Phone Number</label>
          </div>
          <div className="field col-3">
            <Controller
              name="phone_code"
              control={control}
              defaultValue=""
              rules={{ required: "Country Code is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Country Code"
                  className={`input-field appearance-none outline-none w-full${
                    errors.phone_code ? "" : ""
                  }`}
                />
              )}
            />
            {errors.phone_code && (
              <small className="error-message">
                {errors.phone_code.message}
              </small>
            )}
          </div>
          <div className="field col-9">
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Phone Number is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Phone Number"
                  className={`input-field appearance-none outline-none w-full ${
                    errors.phone ? "error" : ""
                  }`}
                />
              )}
            />
            {errors.phone && (
              <small className="error-message">{errors.phone.message}</small>
            )}
          </div>
        </div>

        <div className="flex justify-content-end gap-2 mt-4">
          <button type="button" className="cancel-btns" onClick={handleSkip}>
            Skip
          </button>
          <button type="submit" className="add-new-contact">
            {isAddMode ? "Add Contact" : "Save Changes"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditContactDialog;
