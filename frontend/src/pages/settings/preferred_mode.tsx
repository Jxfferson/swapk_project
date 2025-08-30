import SettingsLayout from "@/components/settings_layout"
import FileManager from "@/components/ui/files_manager"

export default function FilesPage() {
  return (
    <SettingsLayout title="Archivos">
      <FileManager />
    </SettingsLayout>
  )
}
