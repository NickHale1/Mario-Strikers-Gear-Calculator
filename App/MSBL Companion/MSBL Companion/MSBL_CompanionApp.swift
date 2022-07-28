//
//  MSBL_CompanionApp.swift
//  MSBL Companion
//
//  Created by Nick Hale on 6/21/22.
//

import SwiftUI

@main
struct MSBL_CompanionApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            let viewModel = AppViewModel()
            ContentView()
                .environmentObject(viewModel)
        }
    }
}


class AppDelegate:NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        return true
    }
}
