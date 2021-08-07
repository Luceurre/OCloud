import React, { useState } from 'react';
import { PublicKey, publicKeySchema } from 'pages/PublicKeys/types/PublicKey';
import {
  StyledCard,
  StyledPublicKey,
  StyledExpirationDate,
  StyledName,
} from './PublicKeyCard.style';
import { Form, Formik, FormikHelpers } from 'formik';
import TextInput from 'common/components/Inputs/TextInput';
import { Button } from 'common/components/UI/Button';
import TextAreaInput from 'common/components/Inputs/TextAreaInput';
import { updatePublicKey } from 'pages/PublicKeys/services/updatePublicKey';
import { deletePublicKey } from 'pages/PublicKeys/services/deletePublicKey';

interface PublicKeyCardProps {
  publicKey: PublicKey;
  onDeletePublicKey: (publicKey: PublicKey) => void;
}

const PublicKeyCard = ({ publicKey, onDeletePublicKey }: PublicKeyCardProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = async (values: PublicKey, formikHelpers: FormikHelpers<PublicKey>) => {
    try {
      formikHelpers.setValues(await updatePublicKey(values));
      setEditMode(false);
    } catch (updateErrors) {
      formikHelpers.setStatus(updateErrors);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <StyledCard>
      <Formik
        initialValues={publicKey}
        onSubmit={handleSubmit}
        validationSchema={publicKeySchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form style={{ display: 'contents' }}>
          <StyledName>
            <TextInput name="name" editMode={editMode} />
          </StyledName>
          <StyledPublicKey>
            <TextAreaInput name="value" editMode={editMode} />
          </StyledPublicKey>
          {editMode ? (
            <>
              <Button type="submit">Save</Button>
              <Button
                type="button"
                onClick={async () =>
                  deletePublicKey(publicKey).then(() => onDeletePublicKey(publicKey))
                }
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={async () => navigator.clipboard.writeText(publicKey.value)}
                type="submit"
              >
                Copy
              </Button>
              <Button onClick={() => setEditMode(true)} type="submit">
                Edit
              </Button>
            </>
          )}
          <StyledExpirationDate>
            <TextInput name="expirationDate" type="date" editMode={editMode} />
          </StyledExpirationDate>
        </Form>
      </Formik>
    </StyledCard>
  );
};

export default PublicKeyCard;
