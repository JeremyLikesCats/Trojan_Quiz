import minecraft_launcher_lib
import subprocess
import sys

# 1. Define your launch options with your credentials
options = {
    "username": "xxx",
    "uuid": "xxx",
    "token": "xxx"
}

# 2. Get the default Minecraft directory for your operating system
# (e.g., %appdata%\.minecraft on Windows or ~/.minecraft on Linux/Mac)
minecraft_directory = minecraft_launcher_lib.utils.get_minecraft_directory()
print(minecraft_directory)
# 3. Specify the version you want to run
# Note: This version needs to already be installed in your .minecraft folder.
version = "1.21.11" 
minecraft_launcher_lib.install.install_minecraft_version(version, minecraft_directory)


# 4. Generate the Java command required to start the game
try:
    minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(version, minecraft_directory, options)
except Exception as e:
    print(f"Failed to generate command. Is the version installed? Error: {e}")
    sys.exit(1)

# 5. Execute the command to launch the game
print(f"Launching Minecraft {version} as {options['username']}...")
print(minecraft_command)
subprocess.run(minecraft_command)