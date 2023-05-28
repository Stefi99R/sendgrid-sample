import { AddUserToListEvent, GetContactsEvent, MailContact } from './interfaces/mail.interface';
import SendrgridMailService from './services/mail.service';
import * as dotenv from 'dotenv';

dotenv.config();

const testAddUserToList = async (mailService: SendrgridMailService) => {
   const newUser: AddUserToListEvent = {
      firstName: 'Stefan',
      lastName: 'Radojevic',
      email: 'radojevic.stefan.sr@gmail.com',
   };

   await mailService.addUserToList(newUser);
};

const testGetContactsByEmail = async (mailService: SendrgridMailService): Promise<MailContact[]> => {
   const getContactsByEmailEvent: GetContactsEvent = {
      emails: ['radojevic.stefan.sr@gmail.com', 'sradojevic@icefyresolutions.com'],
   };

   const contacts = await mailService.getUsersByEmails(getContactsByEmailEvent);

   console.log({ contacts });

   return contacts;
};

const testDeleteContactsByIds = async (mailService: SendrgridMailService, contacts: MailContact[]): Promise<void> => {
   const contactIds = contacts.map((contact) => contact.id);

   await mailService.removeUserFromList({ ids: contactIds });
};

const main = async () => {
   const mailService = new SendrgridMailService();

   // Add user to marketing list
   // await testAddUserToList(mailService);

   // Get users from marketing list by emails
   const contacts = await testGetContactsByEmail(mailService);

   // Remove user from marketing list
   await testDeleteContactsByIds(mailService, contacts);
};

main();
