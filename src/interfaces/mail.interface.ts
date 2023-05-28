export interface MailContact {
   id: string;
   first_name: string;
   last_name: string;
   email: string;
   alternate_emails?: string[];
   address_line_1?: string;
   address_line_2?: string;
   city?: string;
   country?: string;
   state_province_region?: string;
   postal_code?: string;
   phone_number?: string;
   whatsapp?: string;
   line?: string;
   facebook?: string;
   list_ids?: string[];
   segment_ids?: string[];
}

export interface AddUserToListEvent {
   firstName: string;
   lastName: string;
   email: string;
}

export interface RemoveUsersFromListEvent {
   ids: string[];
}

export interface GetContactsEvent {
   emails: string[];
}
