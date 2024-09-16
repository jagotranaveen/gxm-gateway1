import React from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import ActiveServices from "./components/ActiveServices";
import GeneralInformation from "./components/GeneralInformation";
import KeyPersonnels from "./components/KeyPersonnels";
import RegisteredAddress from "./components/RegisteredAddress";
import VerticalStepper from "../../components/stepper";
import useEntityOnboarding from "./useEntityOnboarding";
import "./entityonboard.scss";

const steps = [
  { label: "General Information", content: <GeneralInformation /> },
  { label: "Registered Addresses", content: <RegisteredAddress /> },
  { label: "Active Services", content: <ActiveServices /> },
  { label: "Key Personnel", content: <KeyPersonnels /> },
];

const EntityOnboard = () => {
  const { handleBack, handleNext, handleSave, activeIndex } =
    useEntityOnboarding(steps);

  return (
    <div className="grid">
      <div className="lg:col-4 md:col-12 sm:col-12 xs:col-12 pt-4">
        <Card className="card-onboard">
          <h2>Add New Entity</h2>
          <p>Complete the necessary steps to onboard a new entity</p>
          <Divider />
          <div className="step-menu">
            <VerticalStepper options={steps} activeIndex={activeIndex} />
          </div>
        </Card>
      </div>
      <div className="lg:col-8 md:col-12 sm:col-12 xs:col-12 pt-4">
        <Card className="card-onboard">
          {steps[activeIndex].content}
          <div className="flex justify-content-end gap-2">
            <Button
              onClick={handleBack}
              disabled={activeIndex === 0}
              className="prv-button"
            >
              Back
            </Button>
            {activeIndex === steps.length - 1 ? (
              <Button onClick={handleSave} className="submit-btn">
                Save
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={activeIndex === steps.length - 1}
                className="submit-btn"
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EntityOnboard;
