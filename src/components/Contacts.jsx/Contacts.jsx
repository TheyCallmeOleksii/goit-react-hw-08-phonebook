import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/ContactsReducer';
import {
  selectContacts,
  selectContactsIsLoading,
  selectFilterTerm,
} from 'redux/selectors';
// import { StyledItem, StyledList } from './StyledContacts';

import * as React from 'react';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const Contacts = ({ contacts }) => {
  const contactsItems = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);

  const filter = useSelector(selectFilterTerm);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filterContacts = contactsItems.filter(contactsItem =>
    contactsItem.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <Demo>
        <List>
          {Array.isArray(filterContacts) &&
            filterContacts.map(({ id, name, number }) => {
              return (
                <ListItem key={id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{name}</ListItemText>
                  <p>{number}</p>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      onDeleteContact(id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
        </List>
      </Demo>
    </div>
  );
};
