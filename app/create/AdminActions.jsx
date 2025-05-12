import React, { useState } from "react";
import { View } from "react-native";
import RequestModal from "@/components/RequestModal";
import TextInputField from "@/components/TextInputField";
import CustomButton from "@/components/CustomButton";
import CustomToast from "@/components/CustomToast";
import ActionCardButton from "@/components/ActionCardButton";
import isEmail from "validator/lib/isEmail";
import {
  addSubjectToMentor,
  removeSubjectFromMentor,
  addUser,
  removeUser,
} from "@/services/adminService";

const ALLOWED_ROLES = ["mentor", "student", "admin"];

const AdminActions = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isRemoveUserModalVisible, setRemoveUserModalVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("mentor");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [userToRemoveEmail, setUserToRemoveEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [userToRemoveEmailError, setUserToRemoveEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

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
    setUserToRemoveEmail("");
    setEmailError("");
    setSubjectError("");
    setUserEmailError("");
    setUserToRemoveEmailError("");
    setRoleError("");
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(!isEmail(value) ? "Invalid email" : "");
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
    setSubjectError(!value.trim() ? "Subject cannot be empty" : "");
  };

  const handleUserEmailChange = (value) => {
    setUserEmail(value);
    setUserEmailError(!isEmail(value) ? "Invalid email" : "");
  };

  const handleUserToRemoveEmailChange = (value) => {
    setUserToRemoveEmail(value);
    setUserToRemoveEmailError(!isEmail(value) ? "Invalid email" : "");
  };

  const handleRoleChange = (value) => {
    setRole(value);
    const lower = value.toLowerCase();
    if (!ALLOWED_ROLES.includes(lower)) {
      setRoleError("Role must be mentor, student, or admin");
    } else {
      setRoleError("");
    }
  };

  const handleAddSubject = async () => {
    if (!email || !subject || emailError || subjectError) {
      setToast({
        text1: "❌ Invalid input",
        text2: "Please correct all errors before submitting.",
      });
      return;
    }
    setLoading(true);
    try {
      await addSubjectToMentor({ email, subject });
      setToast({
        text1: "✅ Subject added!",
        text2: `Added \"${subject}\" to ${email}`,
      });
      setAddModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({ text1: "❌ Failed to add subject", text2: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubject = async () => {
    if (!email || !subject || emailError || subjectError) {
      setToast({
        text1: "❌ Invalid input",
        text2: "Please correct all errors before submitting.",
      });
      return;
    }
    setLoading(true);
    try {
      await removeSubjectFromMentor({ email, subject });
      setToast({
        text1: "✅ Subject removed!",
        text2: `Removed \"${subject}\" from ${email}`,
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
    if (!firstName || !lastName || !userEmail || !role) {
      setToast({ text1: "❌ Missing input", text2: "All fields are required." });
      return;
    }
    if (userEmailError) {
      setToast({ text1: "❌ Invalid email", text2: "Enter a valid email." });
      return;
    }
    if (roleError) {
      setToast({ text1: "❌ Invalid role", text2: "Role must be mentor, student, or admin." });
      return;
    }

    const subjects = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (subjects.length === 0) {
      setToast({
        text1: "❌ Missing subjects",
        text2: "Please enter at least one subject.",
      });
      return;
    }

    setLoading(true);
    try {
      await addUser({
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        role: role.toLowerCase(),
        subjects,
      });
      setToast({
        text1: "✅ User added!",
        text2: `${firstName} ${lastName} (${role})`,
      });
      setAddUserModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({ text1: "❌ Failed to add user", text2: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async () => {
    if (!userToRemoveEmail || userToRemoveEmailError) {
      setToast({
        text1: "❌ Invalid input",
        text2: "Enter a valid email before removing.",
      });
      return;
    }
    setLoading(true);
    try {
      await removeUser({ email: userToRemoveEmail });
      setToast({ text1: "✅ User removed!", text2: userToRemoveEmail });
      setRemoveUserModalVisible(false);
      resetForm();
    } catch (error) {
      setToast({ text1: "❌ Failed to remove user", text2: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ActionCardButton title="Add Subject to Mentor" onPress={() => setAddModalVisible(true)} />
      <ActionCardButton title="Remove Subject from Mentor" onPress={() => setRemoveModalVisible(true)} />
      <ActionCardButton title="Add New User" onPress={() => setAddUserModalVisible(true)} />
      <ActionCardButton title="Remove User" onPress={() => setRemoveUserModalVisible(true)} />

      <RequestModal visible={isAddModalVisible} onClose={() => setAddModalVisible(false)} showFooter={false}>
        <TextInputField label="Mentor Email" value={email} onChangeText={handleEmailChange} placeholder="mentor@example.com" error={emailError} />
        <TextInputField label="Subject" value={subject} onChangeText={handleSubjectChange} placeholder="history" error={subjectError} />
        <CustomButton title={loading ? "Adding..." : "Add Subject"} handlePress={handleAddSubject} isLoading={loading} disabled={loading} containerStyles="bg-orange-500 mt-4" textStyles="text-white" />
      </RequestModal>

      <RequestModal visible={isRemoveModalVisible} onClose={() => setRemoveModalVisible(false)} showFooter={false}>
        <TextInputField label="Mentor Email" value={email} onChangeText={handleEmailChange} placeholder="mentor@example.com" error={emailError} />
        <TextInputField label="Subject" value={subject} onChangeText={handleSubjectChange} placeholder="history" error={subjectError} />
        <CustomButton title={loading ? "Removing..." : "Remove Subject"} handlePress={handleRemoveSubject} isLoading={loading} disabled={loading} containerStyles="bg-orange-500 mt-4" textStyles="text-white" />
      </RequestModal>

      <RequestModal visible={isAddUserModalVisible} onClose={() => setAddUserModalVisible(false)} showFooter={false}>
        <TextInputField label="First Name" value={firstName} onChangeText={setFirstName} placeholder="Shlomi" />
        <TextInputField label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Arbitman" />
        <TextInputField label="Email" value={userEmail} onChangeText={handleUserEmailChange} placeholder="ruth@example.com" error={userEmailError} />
        <TextInputField label="Role" value={role} onChangeText={handleRoleChange} placeholder="mentor / student / admin" error={roleError} />
        <TextInputField label="Subjects (comma separated)" value={subjectsInput} onChangeText={setSubjectsInput} placeholder="English, Math" />
        <CustomButton title={loading ? "Adding..." : "Add User"} handlePress={handleAddUser} isLoading={loading} disabled={loading} containerStyles="bg-orange-500 mt-4" textStyles="text-white" />
      </RequestModal>

      <RequestModal visible={isRemoveUserModalVisible} onClose={() => setRemoveUserModalVisible(false)} showFooter={false}>
        <TextInputField label="User Email" value={userToRemoveEmail} onChangeText={handleUserToRemoveEmailChange} placeholder="user@example.com" error={userToRemoveEmailError} />
        <CustomButton title={loading ? "Removing..." : "Remove User"} handlePress={handleRemoveUser} isLoading={loading} disabled={loading} containerStyles="bg-orange-500 mt-4" textStyles="text-white" />
      </RequestModal>

      {toast && <CustomToast text1={toast.text1} text2={toast.text2} onHide={() => setToast(null)} />}
    </View>
  );
};

export default AdminActions;
