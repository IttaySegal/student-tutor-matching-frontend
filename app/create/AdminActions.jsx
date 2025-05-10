import React, { useState } from "react";
import { View } from "react-native";
import RequestModal from "@/components/RequestModal";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomToast from "@/components/CustomToast";
import ActionCardButton from "@/components/ActionCardButton";
import {
  addSubjectToMentor,
  removeSubjectFromMentor,
  addUser,
  removeUser, // ✅ NEW
} from "@/services/adminService";

const AdminActions = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isRemoveUserModalVisible, setRemoveUserModalVisible] = useState(false); // ✅ NEW

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("mentor");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [userToRemoveEmail, setUserToRemoveEmail] = useState(""); // ✅ NEW

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const resetForm = () => {
    setEmail("");
    setSubject("");
    setFirstName("");
    setLastName("");
    setUserEmail("");
    setRole("mentor");
    setSubjectsInput("");
    setUserToRemoveEmail(""); // ✅ NEW
  };

  const handleAddSubject = async () => {
    setLoading(true);
    try {
      await addSubjectToMentor({ email, subject });
      setToast({
        text1: "✅ Subject added!",
        text2: `Added "${subject}" to ${email}`,
      });
      setAddModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({
        text1: "❌ Failed to add subject",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubject = async () => {
    setLoading(true);
    try {
      await removeSubjectFromMentor({ email, subject });
      setToast({
        text1: "✅ Subject removed!",
        text2: `Removed "${subject}" from ${email}`,
      });
      setRemoveModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({
        text1: "❌ Failed to remove subject",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    setLoading(true);
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        role,
        subjects: subjectsInput.split(",").map((s) => s.trim()).filter(Boolean),
      };

      await addUser(payload);
      setToast({
        text1: "✅ User added!",
        text2: `${payload.first_name} ${payload.last_name} (${payload.role})`,
      });
      setAddUserModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({
        text1: "❌ Failed to add user",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async () => {
    setLoading(true);
    try {
      await removeUser({ email: userToRemoveEmail });
      setToast({
        text1: "✅ User removed!",
        text2: userToRemoveEmail,
      });
      setRemoveUserModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({
        text1: "❌ Failed to remove user",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ActionCardButton
        title="Add Subject to Mentor"
        onPress={() => setAddModalVisible(true)}
      />

      <ActionCardButton
        title="Remove Subject from Mentor"
        onPress={() => setRemoveModalVisible(true)}
      />

      <ActionCardButton
        title="Add New User"
        onPress={() => setAddUserModalVisible(true)}
      />

      <ActionCardButton
        title="Remove User"
        onPress={() => setRemoveUserModalVisible(true)} // ✅ NEW
      />

      {/* ➕ Add Subject Modal */}
      <RequestModal
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        showFooter={false}
      >
        <TextInputField
          label="Mentor Email"
          value={email}
          onChangeText={setEmail}
          placeholder="mentor@example.com"
        />
        <TextInputField
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          placeholder="history"
        />
        <CustomButton
          title={loading ? "Adding..." : "Add Subject"}
          handlePress={handleAddSubject}
          isLoading={loading}
          disabled={loading}
          containerStyles="bg-blue-600 mt-4"
          textStyles="text-white"
        />
      </RequestModal>

      {/* ➖ Remove Subject Modal */}
      <RequestModal
        visible={isRemoveModalVisible}
        onClose={() => setRemoveModalVisible(false)}
        showFooter={false}
      >
        <TextInputField
          label="Mentor Email"
          value={email}
          onChangeText={setEmail}
          placeholder="mentor@example.com"
        />
        <TextInputField
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          placeholder="history"
        />
        <CustomButton
          title={loading ? "Removing..." : "Remove Subject"}
          handlePress={handleRemoveSubject}
          isLoading={loading}
          disabled={loading}
          containerStyles="bg-red-600 mt-4"
          textStyles="text-white"
        />
      </RequestModal>

      {/* 👤 Add User Modal */}
      <RequestModal
        visible={isAddUserModalVisible}
        onClose={() => setAddUserModalVisible(false)}
        showFooter={false}
      >
        <TextInputField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="רות"
        />
        <TextInputField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="כהן"
        />
        <TextInputField
          label="Email"
          value={userEmail}
          onChangeText={setUserEmail}
          placeholder="ruth@example.com"
        />
        <TextInputField
          label="Role"
          value={role}
          onChangeText={setRole}
          placeholder="mentor / student / admin"
        />
        <TextInputField
          label="Subjects (comma separated)"
          value={subjectsInput}
          onChangeText={setSubjectsInput}
          placeholder="אנגלית, מתמטיקה"
        />
        <CustomButton
          title={loading ? "Adding..." : "Add User"}
          handlePress={handleAddUser}
          isLoading={loading}
          disabled={loading}
          containerStyles="bg-purple-600 mt-4"
          textStyles="text-white"
        />
      </RequestModal>

      {/* 🗑️ Remove User Modal */}
      <RequestModal
        visible={isRemoveUserModalVisible}
        onClose={() => setRemoveUserModalVisible(false)}
        showFooter={false}
      >
        <TextInputField
          label="User Email"
          value={userToRemoveEmail}
          onChangeText={setUserToRemoveEmail}
          placeholder="user@example.com"
        />
        <CustomButton
          title={loading ? "Removing..." : "Remove User"}
          handlePress={handleRemoveUser}
          isLoading={loading}
          disabled={loading}
          containerStyles="bg-red-700 mt-4"
          textStyles="text-white"
        />
      </RequestModal>

      {/* ✅ Toast */}
      {toast && (
        <CustomToast
          text1={toast.text1}
          text2={toast.text2}
          onHide={() => setToast(null)}
        />
      )}
    </View>
  );
};

export default AdminActions;
