import React from "react";
import { Dialog } from "primereact/dialog";

const DeleteDialog = ({ visible, onHide, onConfirm, rowToDelete }) => {
  return (
    <Dialog visible={visible} className="edit-contact-dialog" onHide={onHide}>
      <p className="del-dialog-heading">
        {`Are you sure you want to delete ${rowToDelete?.first_name} ${rowToDelete?.last_name}?`}
      </p>
      <p className="del-dialog-para">
        {` Deleting ${rowToDelete?.first_name} ${rowToDelete?.last_name} will permanently remove their information from
        your records. This action cannot be undone. Do you want to proceed?`}
      </p>
      <div className="flex justify-content-end gap-2 mt-4">
        <button className="cancel-btns" onClick={onHide}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={onConfirm}>
          Yes, delete
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
