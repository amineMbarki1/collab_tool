import { TextFieldInput } from "@/components/Form";
import { Topic } from "../types";
import styles from "./TopicDetails.module.css";
import { Card, CardBody } from "@/components/Card";
import { useState } from "react";

export default function TopicDetails({ topic }: { topic: Topic }) {
  return (
    <>
      <Card>
        <CardBody className={styles.body}>
          <TopicInput value={topic.name} label="Topic Name" />
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody className={styles.body}>
          <TopicInput value={topic.description} label="Description" />
        </CardBody>
        <CardBody className={styles.body}>
          <div>
            <label className={styles.label} htmlFor="#">
              Created On
            </label>
            <small> 24 Mai 2023</small>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

function TopicInput({ value, label }: { value: string; label: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setValue] = useState(value);
  return (
    <>
      <div style={{ flex: 1, paddingRight: 10 }}>
        <label className={styles.label} htmlFor="#">
          {label}
        </label>
        {isEditing ? (
          <TextFieldInput
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "100%" }}
            value={inputValue}
          />
        ) : (
          <span>#{inputValue}</span>
        )}
      </div>
      <button
        onClick={() => setIsEditing((prev) => !prev)}
        className={styles.editButton}
      >
        {isEditing ? "SAVE" : "EDIT"}
      </button>
    </>
  );
}
