import { FromSchema } from "json-schema-to-ts";

import contactGetJson from "../schemas/contact.get.json" assert { type: "json" };
import contactUpsertJson from "../schemas/contact.upsert.json" assert { type: "json" };
import contactAddNoteJson from "../schemas/contact.add_note.json" assert { type: "json" };
import leadCaptureJson from "../schemas/lead.capture.json" assert { type: "json" };
import leadQualifyJson from "../schemas/lead.qualify.json" assert { type: "json" };
import leadDispositionJson from "../schemas/lead.disposition.json" assert { type: "json" };
import leadScheduleCallbackJson from "../schemas/lead.schedule_callback.json" assert { type: "json" };
import caseCreateJson from "../schemas/case.create.json" assert { type: "json" };
import caseUpdateStatusJson from "../schemas/case.update_status.json" assert { type: "json" };
import caseAddCommentJson from "../schemas/case.add_comment.json" assert { type: "json" };
import slotCheckAvailabilityJson from "../schemas/slot.check_availability.json" assert { type: "json" };
import appointmentScheduleJson from "../schemas/appointment.schedule.json" assert { type: "json" };
import appointmentRescheduleJson from "../schemas/appointment.reschedule.json" assert { type: "json" };
import appointmentCancelJson from "../schemas/appointment.cancel.json" assert { type: "json" };
import appointmentConfirmJson from "../schemas/appointment.confirm.json" assert { type: "json" };
import surveyEnqueueTargetJson from "../schemas/survey.enqueue_target.json" assert { type: "json" };
import surveyRecordResponseJson from "../schemas/survey.record_response.json" assert { type: "json" };
import surveySummaryForContactJson from "../schemas/survey.summary_for_contact.json" assert { type: "json" };
import notifyEmailJson from "../schemas/notify.email.json" assert { type: "json" };
import notifySmsJson from "../schemas/notify.sms.json" assert { type: "json" };
import consentGetJson from "../schemas/consent.get.json" assert { type: "json" };
import consentSetJson from "../schemas/consent.set.json" assert { type: "json" };
import interactionLogJson from "../schemas/interaction.log.json" assert { type: "json" };

const contactGet = contactGetJson as const;
const contactUpsert = contactUpsertJson as const;
const contactAddNote = contactAddNoteJson as const;
const leadCapture = leadCaptureJson as const;
const leadQualify = leadQualifyJson as const;
const leadDisposition = leadDispositionJson as const;
const leadScheduleCallback = leadScheduleCallbackJson as const;
const caseCreate = caseCreateJson as const;
const caseUpdateStatus = caseUpdateStatusJson as const;
const caseAddComment = caseAddCommentJson as const;
const slotCheckAvailability = slotCheckAvailabilityJson as const;
const appointmentSchedule = appointmentScheduleJson as const;
const appointmentReschedule = appointmentRescheduleJson as const;
const appointmentCancel = appointmentCancelJson as const;
const appointmentConfirm = appointmentConfirmJson as const;
const surveyEnqueueTarget = surveyEnqueueTargetJson as const;
const surveyRecordResponse = surveyRecordResponseJson as const;
const surveySummaryForContact = surveySummaryForContactJson as const;
const notifyEmail = notifyEmailJson as const;
const notifySms = notifySmsJson as const;
const consentGet = consentGetJson as const;
const consentSet = consentSetJson as const;
const interactionLog = interactionLogJson as const;

const schemas = {
  "contact.get": contactGet,
  "contact.upsert": contactUpsert,
  "contact.add_note": contactAddNote,
  "lead.capture": leadCapture,
  "lead.qualify": leadQualify,
  "lead.disposition": leadDisposition,
  "lead.schedule_callback": leadScheduleCallback,
  "case.create": caseCreate,
  "case.update_status": caseUpdateStatus,
  "case.add_comment": caseAddComment,
  "slot.check_availability": slotCheckAvailability,
  "appointment.schedule": appointmentSchedule,
  "appointment.reschedule": appointmentReschedule,
  "appointment.cancel": appointmentCancel,
  "appointment.confirm": appointmentConfirm,
  "survey.enqueue_target": surveyEnqueueTarget,
  "survey.record_response": surveyRecordResponse,
  "survey.summary_for_contact": surveySummaryForContact,
  "notify.email": notifyEmail,
  "notify.sms": notifySms,
  "consent.get": consentGet,
  "consent.set": consentSet,
  "interaction.log": interactionLog
} as const;

export type ToolName = keyof typeof schemas;
export type ToolSchemaMap = typeof schemas;

export const capabilityPackSchemas: ToolSchemaMap = schemas;

export type ContactGetInput = FromSchema<typeof contactGet>;
export type ContactUpsertInput = FromSchema<typeof contactUpsert>;
export type ContactAddNoteInput = FromSchema<typeof contactAddNote>;
export type LeadCaptureInput = FromSchema<typeof leadCapture>;
export type LeadQualifyInput = FromSchema<typeof leadQualify>;
export type LeadDispositionInput = FromSchema<typeof leadDisposition>;
export type LeadScheduleCallbackInput = FromSchema<typeof leadScheduleCallback>;
export type CaseCreateInput = FromSchema<typeof caseCreate>;
export type CaseUpdateStatusInput = FromSchema<typeof caseUpdateStatus>;
export type CaseAddCommentInput = FromSchema<typeof caseAddComment>;
export type SlotCheckAvailabilityInput = FromSchema<typeof slotCheckAvailability>;
export type AppointmentScheduleInput = FromSchema<typeof appointmentSchedule>;
export type AppointmentRescheduleInput = FromSchema<typeof appointmentReschedule>;
export type AppointmentCancelInput = FromSchema<typeof appointmentCancel>;
export type AppointmentConfirmInput = FromSchema<typeof appointmentConfirm>;
export type SurveyEnqueueTargetInput = FromSchema<typeof surveyEnqueueTarget>;
export type SurveyRecordResponseInput = FromSchema<typeof surveyRecordResponse>;
export type SurveySummaryForContactInput = FromSchema<typeof surveySummaryForContact>;
export type NotifyEmailInput = FromSchema<typeof notifyEmail>;
export type NotifySmsInput = FromSchema<typeof notifySms>;
export type ConsentGetInput = FromSchema<typeof consentGet>;
export type ConsentSetInput = FromSchema<typeof consentSet>;
export type InteractionLogInput = FromSchema<typeof interactionLog>;

export function getSchema(tool: ToolName) {
  return schemas[tool];
}
