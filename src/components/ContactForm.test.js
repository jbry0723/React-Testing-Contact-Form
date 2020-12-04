import React from 'react'
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactForm from "./ContactForm"
import {act} from "react-dom/test-utils"

test ("renders without errors", ()=>{
    render (<ContactForm />);
});

test("form submission outputs corresponding JSON text", async() => {
    render(<ContactForm />);
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const messageInput = screen.getByTestId(/message/i);
    const button = screen.getByTestId(/button/i);

    await act(async () => { //await makes the "test function" stop until the promise is settled? "Act" makes sure all updates related to user interaction are complete before its settled?

        userEvent.type(firstNameInput, "boba");

        userEvent.click(lastNameInput);
        userEvent.type(lastNameInput, "henderson");

        userEvent.click(emailInput);
        userEvent.type(emailInput, "bob@bob.com");

        userEvent.click(messageInput);
        userEvent.type(messageInput, "testmessage");

        userEvent.click(button);
    });
    const newFirstName = screen.queryByText(/boba/i);
    const newLastName = screen.queryByText(/henderson/i);
    const newEmail = screen.queryByText(/bob@bob.com/i);
    const newMessage = screen.queryByText(/testmessage/i);


    expect(newFirstName).toBeInTheDocument();
    expect(newLastName).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
    expect(newMessage).toBeInTheDocument();
})