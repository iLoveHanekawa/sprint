export type SprintMailResponse = {
    status: boolean;
    mailer: Record<string, any>;
    message?: string;
    error?: string;
};
export declare const useSprintMailer: (sprintRouterRootUrl: string) => {
    loading: boolean;
    mailer: any;
    sendMail: () => Promise<SprintMailResponse | undefined>;
};
