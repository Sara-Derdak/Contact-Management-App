import React from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) throw new Response("", { status: 404, statusText: "Not Found" });
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
}

export default function Contact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate(); // Hook to navigate after editing

  const handleEditClick = () => {
    // Redirect to the edit page for this contact
    navigate(`/contacts/${contact.id}/edit`);
  };

  return (
    <div id="contact">
      <div>
        {/* Display the avatar URL */}
        <img
          src={contact.avatar || "data:image/jpeg;base64,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"}
          alt="Avatar"
        />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? `${contact.first} ${contact.last} ` : <i>No Name</i>}
        </h1>
        <h4>
            {contact.twitter ? `${contact.twitter} `: <i> no Email </i>}
        </h4>
        <p>
            {contact.notes ? `${contact.notes}`: <i> no notes </i> }
        </p>
        {/* Corrected Form for editing */}
        <button onClick={handleEditClick}>Edit</button>

        <Form method="post" action="destroy">
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}