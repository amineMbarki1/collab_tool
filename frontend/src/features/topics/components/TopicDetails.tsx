import { Topic } from "../types";
import styles from "./TopicDetails.module.css";
import { Card, CardBody } from "@/components/Card";

export default function TopicDetails({ topic }: { topic: Topic }) {
  return (
    <>
      <Card>
        <CardBody className={styles.body}>
          <div>
            <label className={styles.label} htmlFor="#">
              Topic name
            </label>
            <span> #{topic.name}</span>
          </div>
          <button className={styles.editButton}>EDIT</button>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody className={styles.body}>
          <div>
            <label className={styles.label} htmlFor="#">
              Description
            </label>
            <span>{topic.description}</span>
          </div>
          <button className={styles.editButton}>EDIT</button>
        </CardBody>
        <CardBody className={styles.body}>
          <div>
            <label className={styles.label} htmlFor="#">
              Created By
            </label>
            <small> 24 Mai 2023</small>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
