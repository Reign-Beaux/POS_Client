import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { POSButton, POSDialog, POSDialogHeader, POSTransferList } from "common/components";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useRoleContext } from "../../context";
import { Role_Features } from "common/models";

export type RoleDialogFeaturesProps = {};

const RoleDialogFeatures: React.FC<RoleDialogFeaturesProps> = () => {
  const { selects, post } = useAxios("Roles");
  const { isOpenDialogFeatures, setIsOpenDialogFeatures, titleDialog, idSelected } =
    useRoleContext();

  const [allFeatures, setAllFeatures] = useState<SelectDTO[]>([]);
  const [featureByRole, setFeatureByRole] = useState<SelectDTO[]>([]);

  const setFeatures = async () => {
    let responseAllFeatures = await selects("GetFeatures");
    let responseFeatureByRole = await selects("GetFeaturesByRole", idSelected);

    responseAllFeatures = responseAllFeatures.filter(
      (item1) => !responseFeatureByRole.some((item2) => item2.value === item1.value)
    );

    setAllFeatures(responseAllFeatures);
    setFeatureByRole(responseFeatureByRole);
  };

  const updateFeatures = async () => {
    const payload: Role_Features[] = featureByRole.map((item) => {
      return {
        roleId: idSelected,
        featureId: item.value,
      };
    });
    const response = await post<Role_Features[]>(payload, `UpdateRoleFeature/${idSelected}`);
    if (!response.success) return;

    setIsOpenDialogFeatures(false);
  };

  useEffect(() => {
    if (!isOpenDialogFeatures) return;

    setFeatures();
  }, [isOpenDialogFeatures]);

  return (
    <POSDialog open={isOpenDialogFeatures}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialogFeatures} />
      <DialogContent>
        <POSTransferList
          left={allFeatures}
          right={featureByRole}
          setLeft={setAllFeatures}
          setRight={setFeatureByRole}
        />
      </DialogContent>
      <DialogActions>
        <POSButton onClick={updateFeatures}>
          <SaveIcon /> Guardar
        </POSButton>
      </DialogActions>
    </POSDialog>
  );
};

export default RoleDialogFeatures;
