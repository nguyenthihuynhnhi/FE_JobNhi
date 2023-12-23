import { IPermission } from '@/interface/permission';
import {
    addPermissionSelectedCreate,
    removePermissionSelectedCreate,
} from '@/redux/slices/roleSlice';
import { DispatchType, RootState } from '@/redux/store';
import { Box, Card, Chip, Grid, Stack, Switch, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
    permission: IPermission;
}

function ItemPermissionCreate({ permission }: IProps) {
    const dispatch: DispatchType = useDispatch();
    const { listPermissionSelectedCreate } = useSelector((state: RootState) => state.roleSlice);
    const [checked, setChecked] = useState(listPermissionSelectedCreate.includes(permission._id));

    const handleChangeSwitch = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);

        if (isChecked) {
            dispatch(addPermissionSelectedCreate(id));
        } else {
            dispatch(removePermissionSelectedCreate(id));
        }
    };

    return (
        <Grid item xs={6}>
            <Card variant="outlined">
                <Stack padding={2} direction={'row'} gap={2}>
                    <Switch
                        checked={checked}
                        onChange={(e) => handleChangeSwitch(e, permission._id)}
                    />
                    <Box>
                        <Typography variant="subtitle1">{permission.name}</Typography>
                        <Stack direction={'row'} gap={1} alignItems={'baseline'}>
                            <Chip
                                variant="outlined"
                                color={
                                    permission.method === 'GET'
                                        ? 'success'
                                        : permission.method === 'POST'
                                          ? 'warning'
                                          : permission.method === 'PATCH'
                                            ? 'info'
                                            : permission.method === 'DELETE'
                                              ? 'error'
                                              : 'default'
                                }
                                size={'small'}
                                label={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                                        {permission.method}
                                    </Typography>
                                }
                            />
                            <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                {permission.apiPath}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Card>
        </Grid>
    );
}
export default ItemPermissionCreate;
