import { AddUserToListEvent, GetContactsEvent, MailContact } from './interfaces/mail.interface';
import SendGridMailService from './services/mail.service';
import * as dotenv from 'dotenv';

dotenv.config();

const testAddUserToList = async (mailService: SendGridMailService) => {
   const newUser: AddUserToListEvent = {
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      email: 'test-email@gmail.com',
   };

   await mailService.addUserToList(newUser);
};

const testGetContactsByEmail = async (mailService: SendGridMailService): Promise<MailContact[]> => {
   const getContactsByEmailEvent: GetContactsEvent = {
      emails: ['test-email@gmail.com'],
   };

   const contacts = await mailService.getUsersByEmails(getContactsByEmailEvent);

   console.log({ contacts });

   return contacts;
};

const testDeleteContactsByIds = async (mailService: SendGridMailService, contacts: MailContact[]): Promise<void> => {
   const contactIds = contacts.map((contact) => contact.id);

   await mailService.removeUserFromList({ ids: contactIds });
};

const main = async () => {
   const mailService = new SendGridMailService();

   // Add user to marketing list
   await testAddUserToList(mailService);

   // Get users from marketing list by emails
   // const contacts = await testGetContactsByEmail(mailService);

   // Remove user from marketing list
   // await testDeleteContactsByIds(mailService, contacts);
};

main();
